import { NextRequest, NextResponse } from 'next/server';

const REVISO_BASE_URL = 'https://rest.reviso.com';

const REVISO_HEADERS = {
  'X-AppSecretToken': 'demo',
  'X-AgreementGrantToken': 'demo',
  'Content-Type': 'application/json',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const endpoint = '/' + path.join('/');
    const searchParams = request.nextUrl.searchParams;

    // Build URL with query params
    const url = new URL(endpoint, REVISO_BASE_URL);
    url.searchParams.set('demo', 'true');
    searchParams.forEach((value, key) => {
      if (key !== 'demo') {
        url.searchParams.set(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      headers: REVISO_HEADERS,
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Reviso API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Reviso proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Reviso API' },
      { status: 500 }
    );
  }
}
