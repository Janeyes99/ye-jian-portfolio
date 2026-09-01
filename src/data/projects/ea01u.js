export default {
  "id": "p17",
  "slug": "ea01u",
  "category": "hmi",
  "year": "2026",
  "featured": false,
  "statusLabel": {
    "en": "Work in Progress",
    "cn": "进行中"
  },
  "coverImage": "assets/portfolio/ea01u/cover.png?v=20260705",
  "tags": {
    "en": [
      "AI Cockpit",
      "HMI",
      "Work in Progress"
    ],
    "cn": [
      "AI 座舱",
      "HMI",
      "进行中"
    ]
  },
  "title": {
    "en": "EA01U",
    "cn": "EA01U"
  },
  "subtitle": {
    "en": "A work-in-progress AI cockpit HMI project for EA01U, exploring how large-model interaction, voice persona, and vehicle-domain services can be structured into an in-cabin experience.",
    "cn": "进行中的 EA01U AI 座舱 HMI 项目，围绕大模型交互、语音形象与车辆垂域服务，探索车内智能体验的组织方式。"
  },
  "role": {
    "en": "AI cockpit research, interaction architecture and HMI design",
    "cn": "AI 座舱研究、交互架构与 HMI 设计"
  },
  "tools": [
    {
      "en": "AI Cockpit Research",
      "cn": "AI 座舱研究"
    },
    {
      "en": "Interaction Architecture",
      "cn": "交互架构"
    },
    {
      "en": "Competitive Analysis",
      "cn": "竞品分析"
    }
  ],
  "scores": {
    "screenMatter": 10,
    "practicalExperimental": 40,
    "systemObject": 15,
    "researchCommercial": 70,
    "futureEveryday": 72
  },
  "links": [
    {
      "label": {
        "en": "YouTube Video",
        "cn": "YouTube 视频"
      },
      "url": "https://www.youtube.com/watch?reload=9&v=lwh04qaL_nY"
    }
  ],
  "heroEmbed": "https://www.youtube.com/embed/lwh04qaL_nY?rel=0",
  "heroCaption": {
    "en": "EA01U video prototype, linked from YouTube.",
    "cn": "EA01U 视频原型，可跳转至 YouTube 查看。"
  },
  "sections": [
    {
      "title": {
        "en": "Why Large-Model Interaction",
        "cn": "为什么做 AI 大模型？"
      },
      "content": {
        "en": "The research starts from the mismatch between complex in-car tasks and fragmented GUI operations. Large-model interaction is positioned as a way to combine intent understanding, vehicle context, and service orchestration, so drivers can complete cross-app tasks through fewer steps.",
        "cn": "前期研究从复杂用车任务与碎片化 GUI 操作之间的矛盾切入。大模型交互被定位为一种整合意图理解、车辆语境与服务调度的方式，让驾驶者用更少步骤完成跨应用任务。"
      },
      "image": "assets/portfolio/ea01u/research-01-ai-model-meaning.png?v=20260707-ai-model",
      "imageAlt": {
        "en": "Research framing for large-model interaction in the cockpit",
        "cn": "大模型座舱交互的研究切入点"
      },
      "caption": {
        "en": "Research framing for large-model interaction in the cockpit.",
        "cn": "大模型座舱交互的研究切入点。"
      }
    },
    {
      "title": {
        "en": "Experience Analysis from Technical Architecture",
        "cn": "基于技术架构的体验分析"
      },
      "content": {
        "en": "The experience analysis looks past the interface result and returns to the relationship between user language, model understanding, domain capability, and execution feedback. This helps distinguish what should be handled by natural language and what still needs stable, glanceable interface support.",
        "cn": "体验分析不只看界面结果，而是回到用户语料、模型理解、垂域能力和执行反馈之间的关系。这样可以判断哪些能力适合交给自然语言，哪些状态仍然需要稳定、可扫读的界面承接。"
      },
      "image": "assets/portfolio/ea01u/research-02-technical-architecture.png",
      "imageAlt": {
        "en": "Technical architecture analysis for AI cockpit experience",
        "cn": "AI 座舱体验的技术架构分析"
      },
      "caption": {
        "en": "Technical architecture translated into experience constraints.",
        "cn": "将技术架构转化为体验约束。"
      }
    },
    {
      "title": {
        "en": "AI Product Conversation Components",
        "cn": "AI 产品对话组件拆解"
      },
      "content": {
        "en": "Competitive product analysis identifies recurring patterns such as waiting feedback, generated results, rating feedback, quick commands, and follow-up prompts. These patterns become references for voice overlays, content cards, and operation confirmation in the vehicle interface.",
        "cn": "对主流 AI 产品的对话组件进行拆解后，界面模式被归纳为等待反馈、生成结果、评价反馈、快捷指令和继续追问等类型。这些模式为车机中的语音浮层、内容卡片和操作确认提供了组件参考。"
      },
      "image": "assets/portfolio/ea01u/research-03-ai-product-components-v2.png",
      "imageAlt": {
        "en": "Competitive analysis of AI product conversation components",
        "cn": "AI 产品对话组件竞品分析"
      },
      "caption": {
        "en": "Conversation component patterns from AI product references.",
        "cn": "来自 AI 产品参考的对话组件模式。"
      }
    },
    {
      "title": {
        "en": "Embedding Patterns in Vehicle UI",
        "cn": "车载界面的嵌入方式"
      },
      "content": {
        "en": "In the cockpit context, a conversational entry point must avoid interrupting driving information while remaining present enough for complex tasks. The study compares embedded, floating, and full-screen patterns, with visibility of driving-related information treated as a primary constraint.",
        "cn": "在车载语境中，对话入口既不能打断驾驶信息，也需要在复杂任务中有足够存在感。研究比较了嵌入式、浮层式和全屏式信息承载方式，并将驾驶相关信息的可见性作为优先约束。"
      },
      "image": "assets/portfolio/ea01u/research-04-interface-patterns.png",
      "imageAlt": {
        "en": "Vehicle UI patterns for AI interaction entry points",
        "cn": "AI 交互入口的车载界面模式"
      },
      "caption": {
        "en": "Interface patterns evaluated against cockpit information priority.",
        "cn": "围绕座舱信息优先级评估界面承载方式。"
      }
    },
    {
      "title": {
        "en": "Voice Persona and Brand Expression",
        "cn": "语音形象与品牌表达"
      },
      "content": {
        "en": "Voice persona shapes how users judge capability boundaries, brand character, and reliability. The research separates abstract assistants, personified characters, and functional agent identities, then uses that spectrum to define an appropriate voice identity and visual presence for EA01U.",
        "cn": "语音形象影响用户对系统能力边界、品牌气质和可靠性的判断。研究区分抽象无实体、拟人角色和功能型助手等方向，用来确定 EA01U 更适合的声音身份与视觉表达尺度。"
      },
      "image": "assets/portfolio/ea01u/research-05-voice-persona.png",
      "imageAlt": {
        "en": "Voice persona comparison for AI cockpit assistant identity",
        "cn": "AI 座舱助手身份的语音形象比较"
      },
      "caption": {
        "en": "Voice persona directions used to calibrate system identity.",
        "cn": "用于校准系统身份的语音形象方向。"
      }
    },
    {
      "title": {
        "en": "Domain Identity Structure",
        "cn": "垂域身份分类"
      },
      "content": {
        "en": "The final research step places large-model capability back into vehicle-domain services, separating navigation, vehicle control, entertainment, climate, and scenario recommendation boundaries. This turns AI from a general chat entry into a more trustworthy in-cabin coordination system.",
        "cn": "最后将大模型能力放回车内垂域服务中，区分导航、车控、娱乐、环境调节与场景建议等能力边界。这样的身份划分有助于把 AI 从一个泛化聊天入口，转化为可被信任的车内协同系统。"
      },
      "image": "assets/portfolio/ea01u/research-06-domain-identity.png",
      "imageAlt": {
        "en": "Domain identity structure for in-cabin AI services",
        "cn": "车内 AI 服务的垂域身份结构"
      },
      "caption": {
        "en": "Domain boundaries for a vehicle-native AI assistant.",
        "cn": "面向车内 AI 助手的垂域能力边界。"
      }
    }
  ]
};
