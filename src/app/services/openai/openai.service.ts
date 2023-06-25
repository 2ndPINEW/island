import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Configuration, OpenAIApi } from 'openai';
import { first, from, map, mergeMap } from 'rxjs';
import { IslandState } from 'src/app/modules/island/island';
import {
  setBeachColor,
  setInlandColor,
  setLightStrength,
  setSeaColor,
  setSkyColor,
} from 'src/app/modules/island/island.actions';
import { selectIsland } from 'src/app/modules/island/island.selector';

const apiKeyStorageKey = 'openAiApiKey';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private readonly config = new Configuration({
    apiKey: this.openAiApiKey,
  });
  private readonly openai = new OpenAIApi(this.config);

  constructor(
    private readonly store: Store<{
      island: IslandState;
    }>
  ) {}

  // なんこのコードwwwwww
  // function呼び出したり interface 的な部分とかわけなさいw
  chatCompletion(input: string) {
    return this.store
      .select(selectIsland)
      .pipe(first())
      .pipe(
        mergeMap((island) =>
          from(
            this.openai.createChatCompletion({
              model: 'gpt-3.5-turbo-0613',
              messages: [
                {
                  role: 'system',
                  content:
                    'あなたは島の状態を管理するためのAIです。ユーザーからの要望に合わせて色やパラメータを調整してください。',
                },
                {
                  role: 'system',
                  content: `島の現在の状態は以下の通りです：${JSON.stringify(
                    island
                  )}`,
                },
                { role: 'user', content: input },
              ],
              functions: [
                {
                  name: 'setObjectColor',
                  description: '島の地表やオブジェクトの色を変更します',
                  parameters: {
                    type: 'object',
                    properties: {
                      inlandColor: {
                        type: 'string',
                        description: '島の内陸部分の色。例: #3A9648',
                      },
                      beachColor: {
                        type: 'string',
                        description: '島のビーチ部分の色。例: #E7E0AF',
                      },
                      seaColor: {
                        type: 'string',
                        description:
                          '海の色、透明度は0.5固定で変更できません。例: #7DB3E7',
                      },
                      skyColor: {
                        type: 'string',
                        description: '空の色。例: #78A3FF',
                      },
                      lightStrength: {
                        type: 'number',
                        description: '光の強さ。1 ~ 100, 例: 80',
                      },
                    },
                    required: [],
                  },
                },
              ],
              function_call: 'auto',
            })
          )
            .pipe(map((chatCompletion) => chatCompletion.data))
            .pipe(
              map((data) => {
                const choice = data.choices[0];
                const finishReason = choice.finish_reason;
                const functionCall = choice.message?.function_call;
                if (finishReason === 'function_call' && functionCall) {
                  const {
                    inlandColor,
                    beachColor,
                    seaColor,
                    skyColor,
                    lightStrength,
                  } = JSON.parse(functionCall.arguments || '{}');
                  const functionName = functionCall.name;
                  if (functionName === 'setObjectColor') {
                    if (inlandColor) {
                      this.store.dispatch(setInlandColor(inlandColor));
                    }
                    if (beachColor) {
                      this.store.dispatch(setBeachColor(beachColor));
                    }
                    if (seaColor) {
                      this.store.dispatch(setSeaColor(seaColor));
                    }
                    if (skyColor) {
                      this.store.dispatch(setSkyColor(skyColor));
                    }
                    if (lightStrength) {
                      this.store.dispatch(setLightStrength(lightStrength));
                    }
                  }
                }
                return data;
              })
            )
        )
      );
  }

  set openAiApiKey(value: string) {
    window.localStorage.setItem(apiKeyStorageKey, value);
  }

  get openAiApiKey(): string {
    return window.localStorage.getItem(apiKeyStorageKey) || '';
  }
}
