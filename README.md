# Eva.js HitArea Debug Plugin

在 EvaJs 中，给 Event 设置了 HitArea，如果需要调整点击区域的宽高，位置，形状等参数，本插件可以提供可视化的染色能力

![插件效果](https://gw.alicdn.com/imgextra/i1/O1CN01G1ue7I21qXave2eiK_!!6000000007036-0-tps-2470-1130.jpg)

## 使用方法

```
npm install @eva/eva-plugin-hitarea-dyeing --save-dev
```


```javascript
import {HitAreaDyeingSystem} from '@eva/eva-plugin-hitarea-dyeing';


const game = new Game({
  systems: [new HitAreaDyeingSystem()]
})

...

```

### Options

| 名称                  | 描述                                                                             | 默认值 |
| --------------------- | -------------------------------------------------------------------------------- | ------ |
| hitAreaColor          | 命中区域颜色                                                                     | red    |
| hitAreaOpacity        | 命中区域透明度                                                                   | 0.3    |
| filterGameObjectNames | 默认对所有设置了 Event HitArea 的 GameObject 生效，可以通过 GameObject name 过滤 | 空数组 |
