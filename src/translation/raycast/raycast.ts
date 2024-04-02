import { QueryWordInfo } from "../../dictionary/youdao/types";
import { QueryTypeResult, TranslationType } from "../../types";
import { AI } from "@raycast/api";

const prompt =
  "You are a faithful translation assistant that can only translate text and cannot interpret it, you can only return the translated text, do not show additional descriptions and annotations.\n";

export async function requestRaycastAITranslate(queryWordInfo: QueryWordInfo): Promise<QueryTypeResult> {
  const message =
    prompt +
    `translate '${queryWordInfo.word}' from the ${queryWordInfo.fromLanguage} text to ${queryWordInfo.toLanguage}`;
  // console.log(message);
  const resultText = await AI.ask(message);

  const result: QueryTypeResult = {
    type: TranslationType.RaycastAI,
    queryWordInfo,
    translations: [resultText],
    result: {
      translatedText: resultText,
    },
  };
  return result;
}
