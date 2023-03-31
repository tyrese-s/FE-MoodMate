import { getGoogleVisionURL } from "./../../utils/api";

function generateBody(image: string | null | undefined) {
  if (image === null || image === undefined) {
    throw new Error("Image cannot be null or undefined!");
  }

  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: "TEXT_DETECTION",
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return body;
}

async function callGoogleVisionAsync(image: string | null | undefined) {
  const API_URL = await getGoogleVisionURL();
  console.log(API_URL);
  const body = generateBody(image);
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  console.log(result);

  const detectedText = result.responses[0].fullTextAnnotation;

  return detectedText
    ? detectedText
    : { text: "This image doesn't contain any text!" };
  // return { text: "This is a placeholder piece of test to help styling!" };
}

export default callGoogleVisionAsync;
