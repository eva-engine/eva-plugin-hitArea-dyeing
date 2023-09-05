import { System } from '@eva/eva.js';
import { HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import { Graphics } from '@eva/plugin-renderer-graphics';

export interface HitAreaDyeingSystemPramas {
  hitAreaColor?: string;
  hitAreaOpacity?: number;
  filterGameObjectNames?: string[];
}
export default class HitAreaDyeingSystem extends System<HitAreaDyeingSystemPramas> {
  static systemName = 'HitAreaDyeingSystem';
  private hitAreaColor = 'red';
  private hitAreaOpacity = 0.3;
  private filterGameObjectNames: string[] = [];

  init(params: HitAreaDyeingSystemPramas) {
    const { hitAreaColor, hitAreaOpacity, filterGameObjectNames } = params;
    if (hitAreaColor) this.hitAreaColor = hitAreaColor;
    if (hitAreaOpacity) this.hitAreaOpacity = hitAreaOpacity;
    if (filterGameObjectNames) this.filterGameObjectNames = filterGameObjectNames;
  }

  update() {
    this.game.gameObjects.forEach((obj) => {
      const hitArea = obj.getComponent('Event')?.hitArea;
      if (!hitArea) return;
      if (this.filterGameObjectNames.indexOf(obj.name) > -1) return;
      if (obj.components.find((item) => item.name == 'HitAreaDyeing')) return;

      const { x, y, width, height, paths, radius } = hitArea.style;
      const gra = obj.addComponent(new Graphics());
      gra.name = 'HitAreaDyeing';
      gra.graphics.beginFill(this.hitAreaColor, this.hitAreaOpacity);

      switch (hitArea.type) {
        case HIT_AREA_TYPE.Circle:
          gra.graphics.drawCircle(x, y, radius);
          break;
        case HIT_AREA_TYPE.Ellipse:
          gra.graphics.drawEllipse(x, y, width, height);
          break;
        case HIT_AREA_TYPE.Rect:
          gra.graphics.drawRect(x, y, width, height);
          break;
        case HIT_AREA_TYPE.RoundedRect:
          gra.graphics.drawRoundedRect(x, y, width, height, radius);
          break;
        case HIT_AREA_TYPE.Polygon:
          gra.graphics.drawPolygon(paths);
          break;
      }
      gra.graphics.endFill();
    });
  }
}
