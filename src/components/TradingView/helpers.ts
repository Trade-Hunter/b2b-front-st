// Make requests to CryptoCompare API

export async function makeApiRequest(path: any) {
  try {
    let auth = JSON.parse((localStorage as any).getItem("auth"));
    auth = {
      auth: {
        token:
          "eyJfaWQiOiI2MjY4YzcwZDU0OTAzN2Y2MzIxMTAwN2EiLCJpYXQiOjE2Njk3NTkzMDgwMzh9.eyJhbGciOiJFUzUxMiIsImtpZCI6Ilo3c2M4bXdtUEFISzFhSzN4TGVzbDRlckFiYXVTWG1pLUZhSTM5REVwY0kifQ.ADfhke8XGkC4xbEKBYb5MhN_1xxjy93PkEeoLIUdzjWFZWVypANXWWE9gjU2jMwZKCywhT-4fQq4sbaLwlwy0L-ZAP9Qq33hnenV0aC29-n7b5EAnpj4ip_in_YpnvFZ_pKGLj9yTA7XFyhHQgRgIWly6w1rDGDP-zYSyXawRvCkINb2",
      },
    };

    const response = await fetch(`${import.meta.env.VITE_API_HOST}/${path}`, {
      headers: { "user-token": auth?.auth.token },
    });

    return response.json();
  } catch (error: any) {
    console.log("error api request", error);
    throw new Error(`CryptoCompare request error: ${error.status}`);
  }
}

// Generate a symbol ID from a pair of the coins
export function generateSymbol(exchange: any, fromSymbol: any, toSymbol: any) {
  const short = `${fromSymbol}/${toSymbol}`;
  return {
    short,
    full: `${exchange}:${short}`,
  };
}

export function parseFullSymbol(fullSymbol: any) {
  const match = fullSymbol.match(/^(\w+):(\w+)$/);
  if (!match) {
    return null;
  }

  return {
    exchange: match[1],
    sym: match[2],
  };
}
