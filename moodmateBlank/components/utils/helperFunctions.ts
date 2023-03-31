function generateBody(image: string) {
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
  // const body = generateBody(image);
  // const response = await fetch(API_URL, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // });

  // const result = await response.json();
  // console.log(result);

  // const detectedText = result.responses[0].fullTextAnnotation;

  // return detectedText
  //   ? detectedText
  //   : { text: "This image doesn't contain any text!" };
  return { text: "This is a placeholder piece of test to help styling!" };
}

export default callGoogleVisionAsync;
