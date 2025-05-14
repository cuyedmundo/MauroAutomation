import fs from 'fs';
import path from 'path';
import { Page, Request } from 'playwright';

interface LoggedHttpEntry {
  feature: string;
  scenario: string;
  step: string;
  domain: string;
  url: string;
  method: string;
  status: number;
  requestHeaders: Record<string, string>;
  responseHeaders: Record<string, string>;
  requestBody?: string;
  responseBody?: string;
  error?: string;
  timestamp?: string;
}

const logs: LoggedHttpEntry[] = [];
const requestStepMap = new WeakMap<Request, string>();

function getTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

export function logHttpInteraction(entry: LoggedHttpEntry) {
  const embeddedStatusMatch = entry.responseBody?.match(/["']?status["']?\s*[:=]?\s*["']?(\d{3})["']?/i);
  const embeddedStatus = embeddedStatusMatch ? parseInt(embeddedStatusMatch[1], 10) : undefined;
  const embeddedError = embeddedStatus !== undefined && embeddedStatus >= 400;
  

  const isAbortedError = entry.error?.includes("ERR_ABORTED");

  if (
    (entry.status >= 400 || embeddedError) && 
    !isAbortedError
  ) {
    entry.timestamp = getTimestamp();
    logs.push(entry);
  }
}

export async function generateLogFile() {

    const reportDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

    if (logs.length === 0) {
    const okMessage = [
      '_'.repeat(80),
      `Timestamp   : ${getTimestamp()}`,
      ' *** No HTTP errors (codes ≥ 400) were found in the logged responses.',
      '_'.repeat(80),
      ''
    ].join('\n');

    fs.writeFileSync(path.join(reportDir, 'http.log'), okMessage);
    return;
  }

  const logContent = logs.map((log) => {
    const embeddedMatch = log.responseBody?.match(/["']?status["']?\s*[:=]?\s*["']?(\d{3})["']?/i);
    const embeddedStatus = embeddedMatch ? parseInt(embeddedMatch[1], 10) : undefined;
    
    return [
      '_'.repeat(80),
      `Feature     : ${log.feature}`,
      `Scenario    : ${log.scenario}`,
      `Step        : ${log.step}`,
      `Timestamp   : ${log.timestamp || 'N/A'}`,
      `Domain      : ${log.domain}`,
      `Method      : ${log.method.toUpperCase()}`,
      `URL         : ${log.url}`,
      `Status code : ${log.status}`,
      `Body status : ${embeddedStatus?.toString() || 'N/A'}`,
      '',
      `---> Request:`,
      `Headers:${JSON.stringify(log.requestHeaders, null, 2).replace(/\n/g, '\n      ')}`,
      `Body:${log.requestBody ? '\n      ' + log.requestBody : ' N/A'}`,
      '',
      `<---Response:`,
      `Headers:${JSON.stringify(log.responseHeaders, null, 2).replace(/\n/g, '\n      ')}`,
      `Body:${log.responseBody ? '\n      ' + log.responseBody : ' N/A'}`,
      log.error ? `Error: ${log.error}` : ''
    ].join('\n');
  }).join('\n\n');

  fs.writeFileSync(path.join(reportDir, 'http.log'), logContent);
  logs.length = 0;
}

export function getRequestAndResponse(page: Page) {
  page.on('request', (request) => {
    const currentStep = (page as any).scenarioInfo?.currentStep || 'Unknown';
    requestStepMap.set(request, currentStep);
  });

  page.on('response', async (response) => {
    const request = response.request();
    const url = response.url();
    const method = request.method();
    const status = response.status();
    const requestHeaders = request.headers();
    const responseHeaders = response.headers();
    const step = requestStepMap.get(request) || 'Unknown';
    const scenarioInfo = (page as any).scenarioInfo || {};

    let requestBody: string | undefined;
    let responseBody: string | undefined;
    
    try {
      // Capturamos body solo para métodos que lo permiten
      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        requestBody = await request.postData() ?? undefined;
      }
      
      if (response.headers()['content-type']?.match(/(application\/json|text\/)/i)) {
        responseBody = await response.text();
      }
    } catch (error) {
      responseBody = `Error reading body: ${error instanceof Error ? error.message : String(error)}`;
    }

    logHttpInteraction({
      feature: scenarioInfo.feature || 'Unknown',
      scenario: scenarioInfo.scenario || 'Unknown',
      step,
      domain: new URL(url).hostname,
      url,
      method,
      status,
      requestHeaders,
      responseHeaders,
      requestBody,
      responseBody
    });
  });

  page.on('requestfailed', async (request) => {
    const step = requestStepMap.get(request) || 'Unknown';
    const scenarioInfo = (page as any).scenarioInfo || {};

    let requestBody: string | undefined;
    let responseBody: string | undefined;
    
    try {
      if (['POST', 'PUT', 'PATCH'].includes(request.method())) {
        requestBody = await request.postData() ?? undefined;
      }
      
      const response = await request.response();
      if (response) {
        responseBody = await response.text();
      }
    } catch (error) {
      responseBody = `Error reading failed request: ${error instanceof Error ? error.message : String(error)}`;
    }

    logHttpInteraction({
      feature: scenarioInfo.feature || 'Unknown',
      scenario: scenarioInfo.scenario || 'Unknown',
      step,
      domain: new URL(request.url()).hostname,
      url: request.url(),
      method: request.method(),
      status: 0,
      requestHeaders: request.headers(),
      responseHeaders: {},
      requestBody,
      responseBody,
      error: request.failure()?.errorText || 'Request failed'
    });
  });
}