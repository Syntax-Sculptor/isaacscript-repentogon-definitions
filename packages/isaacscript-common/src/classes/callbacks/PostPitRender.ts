import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getPits } from "../../functions/gridEntitiesSpecific";
import { CustomCallbackPit } from "./validation/CustomCallbackPit";

export class PostPitRender extends CustomCallbackPit<ModCallbackCustom2.POST_PIT_RENDER> {
  constructor() {
    super();

    this.otherCallbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  // ModCallback.POST_RENDER (2)
  postRender = (): void => {
    for (const pit of getPits()) {
      this.fire(pit);
    }
  };
}
