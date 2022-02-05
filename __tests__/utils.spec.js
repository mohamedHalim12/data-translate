import axios from 'axios';

describe('Get a list of sentences from the API', () => {
  const baseUrl = 'http://localhost:3000';

  let response;
  /**
   * @type {Array<{ text_vo: string, translated_text: string, text_id: string}>}
   */
  // let data;
  test('Should return a 200 and have a result', async () => {
    response = await axios.get(`${baseUrl}/api/untranslated/sentences/`);
    expect(response.status).toBe(200);
    expect(response.data).toBeTruthy();
  });

  // test('Resutls from api must contain an array of data of 10 Sentences', async () => {
  //   expect(Array.isArray(response.data.data)).toBe(true);
  //   const { count } = response.data;
  //   ({ data } = response.data);
  //   expect(data.length).toBe(10);
  //   expect(data.length).toEqual(count);
  // });

  // test('Data Resulted should have no translation', async () => {
  //   ({ data } = response.data);
  //   const translation = data.includes((sentence) => sentence.translated_text);
  //   expect(translation).toBe(false);
  // });
});

// describe('Posting a proposition of translation', () => {
//   const baseUrl = 'http://localhost:3000';
//   const sentence = {
//     idText_vo: '',
//     translated_text: 'This is a test sentence',
//   };
//   let response;
//   test('Should return a 200 and have a result', async () => {
//     response = await axios.post(
//       `${baseUrl}/api/untranslated/sentences/untranslated`,
//       sentence,
//     );
//     expect(response.status).toBe(200);
//     expect(response.data).toBeTruthy();
//   });
// });
