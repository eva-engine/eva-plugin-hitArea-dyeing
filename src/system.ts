import { System } from '@eva/eva.js';
import { HIT_AREA_TYPE } from '@eva/plugin-renderer-event';
import { Graphics } from '@eva/plugin-renderer-graphics';

export default class HitAreaDyeingSystem extends System {
  static systemName = 'HitAreaDyeingSystem';
  
  update() {
    this.game.gameObjects.forEach((obj) => {
      const hitArea = obj.getComponent('Event')?.hitArea;
      if (!hitArea) return;
      if (obj.components.find((item) => item.name == 'HitAreaDyeing')) return;

      const { x, y, width, height, paths, radius } = hitArea.style;
      const gra = obj.addComponent(new Graphics());
      gra.name = 'HitAreaDyeing';
      gra.graphics.beginFill(0xde3249, 0.4);
      
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
