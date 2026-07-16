export default {
  "id": "p1",
  "slug": "memory-parking-hmi",
  "category": "hmi",
  "year": "2024",
  "featured": true,
  "coverImage": "assets/portfolio/memory-parking/hero-loop.gif?v=20260701",
  "tags": {
    "en": [
      "Memory Parking",
      "HMI"
    ],
    "cn": [
      "记忆泊车",
      "HMI"
    ]
  },
  "title": {
    "en": "Memory Parking",
    "cn": "记忆泊车"
  },
  "subtitle": {
    "en": "A memory-parking HMI project structured around spatial understanding, camera-view priority, and uncertainty feedback, so automated parking states can be read without adding driver workload.",
    "cn": "围绕空间理解、视角优先级与不确定性反馈展开的记忆泊车 HMI 项目，使自动泊车状态能够被清晰读取，同时减少额外驾驶负担。"
  },
  "role": {
    "en": "HMI design, interaction logic and visual specification",
    "cn": "HMI 设计、交互逻辑与视觉规范"
  },
  "tools": [
    {
      "en": "HMI Design",
      "cn": "HMI 设计"
    },
    {
      "en": "Interaction Logic",
      "cn": "交互逻辑"
    },
    {
      "en": "Visual Specification",
      "cn": "视觉规范"
    }
  ],
  "scores": {
    "screenMatter": 20,
    "practicalExperimental": 35,
    "systemObject": 20,
    "researchCommercial": 65,
    "futureEveryday": 65
  },
  "links": [
    {
      "label": {
        "en": "WeChat Video",
        "cn": "公众号视频"
      },
      "url": "https://weixin.qq.com/sph/A3TXxsRghd"
    }
  ],
  "sections": [
    {
      "title": {
        "en": "Design Framework Layout",
        "cn": "设计框架布局"
      },
      "content": {
        "en": "The framework separates manual parking and memory parking into two information hierarchies. Manual parking relies on SR, front/rear views and wheel-view support; memory parking gives the large SR view priority, while 360 view and Eagle Map clarify local environment and spatial relationships.",
        "cn": "框架将手动泊入与记忆泊入区分为两套信息层级：手动泊入阶段由 SR、前后视角和轮载视角协同辅助；记忆泊入阶段则让大 SR 成为主视角，并通过 360 或 Eagle Map 明确局部环境与空间关系。"
      },
      "image": "assets/portfolio/memory-parking/design-framework-layout.png",
      "imageAlt": {
        "en": "Design framework layout visual",
        "cn": "设计框架布局视觉"
      },
      "caption": {
        "en": "Information hierarchy for manual parking and memory parking.",
        "cn": "手动泊入与记忆泊入的信息层级。"
      }
    },
    {
      "title": {
        "en": "Component Specification",
        "cn": "组件规范说明"
      },
      "content": {
        "en": "After the overall hierarchy is defined, recurring interface states are organized into reusable rules: parking-space availability, selected and parking-in-progress states, completion feedback, driving line, acceleration/deceleration overlay, and path matching.",
        "cn": "在确定整体层级后，界面中反复出现的状态形成可复用规则：车位可用状态、选中与泊入中状态、泊入完成反馈、智驾线、加减速效果叠加以及路径匹配。"
      },
      "image": "assets/portfolio/memory-parking/component-specification.png",
      "imageAlt": {
        "en": "Component specification visual",
        "cn": "组件规范说明视觉"
      },
      "caption": {
        "en": "Reusable state rules for parking interaction feedback.",
        "cn": "泊车交互反馈中的可复用状态规则。"
      }
    },
    {
      "title": {
        "en": "SR Camera Display Strategy",
        "cn": "SR镜头显示策略"
      },
      "content": {
        "en": "The SR view defines how the interface shifts emphasis as the parking task changes: vehicle body awareness, nearby obstacles, and the local environment each need different visual priority at different moments.",
        "cn": "SR 视角定义泊车任务变化时界面重心如何转移：车身感知、周边障碍物和局部环境信息在不同阶段需要不同的视觉优先级。"
      },
      "image": "assets/portfolio/memory-parking/sr-camera-strategy.png",
      "imageAlt": {
        "en": "SR camera display strategy visual",
        "cn": "SR镜头显示策略视觉"
      },
      "caption": {
        "en": "Camera emphasis across the memory-parking flow.",
        "cn": "记忆泊车流程中的镜头重点切换。"
      }
    },
    {
      "title": {
        "en": "Parking Camera Scheduling Mechanism and Classification",
        "cn": "泊车镜头调度机制与归类"
      },
      "content": {
        "en": "Parking views are mapped back to scenario types, allowing the system to move between camera information in a predictable way instead of simply stacking more visuals on the driver.",
        "cn": "不同泊车视角被重新对应到具体场景类型，让系统能够以可预期的方式切换镜头信息，而不是简单把更多画面叠加给驾驶员。"
      },
      "image": "assets/portfolio/memory-parking/parking-camera-scheduling.png",
      "imageAlt": {
        "en": "Parking camera scheduling mechanism and classification visual",
        "cn": "泊车镜头调度机制与归类视觉"
      },
      "caption": {
        "en": "Scenario-based organization of parking camera views.",
        "cn": "基于场景的泊车镜头组织方式。"
      }
    },
    {
      "title": {
        "en": "System Response to Objective Uncertainty",
        "cn": "系统对客观不确定性的应对能力"
      },
      "content": {
        "en": "Because automated parking still faces ambiguous environmental conditions, the interface defines how uncertainty should appear. The goal is to make system limits understandable while keeping the driver oriented to what is happening.",
        "cn": "由于自动泊车仍会遇到环境识别中的模糊情况，界面进一步定义不确定性的表达方式。目标是让系统边界变得可理解，同时让驾驶员持续知道当前发生了什么。"
      },
      "image": "assets/portfolio/memory-parking/objective-uncertainty.png",
      "imageAlt": {
        "en": "System response to objective uncertainty visual",
        "cn": "系统对客观不确定性的应对能力视觉"
      },
      "caption": {
        "en": "Interface feedback for ambiguous environmental conditions.",
        "cn": "面向环境不确定性的界面反馈方式。"
      }
    },
    {
      "title": {
        "en": "Design Review",
        "cn": "设计走查"
      },
      "content": {
        "en": "The final review brings the flow back together: interaction states, visual hierarchy, camera logic, and edge-case feedback are checked as one continuous parking experience.",
        "cn": "最后的设计走查将流程重新串联起来：交互状态、视觉层级、镜头逻辑和异常反馈被放回同一条连续的泊车体验中检查。"
      },
      "image": "assets/portfolio/memory-parking/design-review.png",
      "imageAlt": {
        "en": "Design review visual",
        "cn": "设计走查视觉"
      },
      "caption": {
        "en": "Consistency check across the full memory-parking experience.",
        "cn": "完整记忆泊车体验中的一致性检查。"
      }
    }
  ]
};
