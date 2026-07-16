export default {
  "id": "p3",
  "slug": "path-tracking-apparatus",
  "category": "interaction-mechanisms",
  "year": "2023",
  "featured": true,
  "coverImage": "assets/portfolio/path/cover.jpg",
  "tags": {
    "en": [
      "Tangible Interaction",
      "Speculative Design"
    ],
    "cn": [
      "实体交互",
      "思辨设计"
    ]
  },
  "title": {
    "en": "PATH: Perceptive Apparatus for Tracking Humans",
    "cn": "PATH：人体追踪感知装置"
  },
  "subtitle": {
    "en": "A tactile apparatus that evaluates computer users through touch, light, and pneumatic surface feedback.",
    "cn": "通过触摸、灯光与气动表面反馈评估计算机使用者状态的触觉装置。"
  },
  "role": {
    "en": "Interaction Designer",
    "cn": "交互设计师"
  },
  "tools": [
    "Physical Computing",
    "Pneumatics",
    "Touch Sensing"
  ],
  "scores": {
    "screenMatter": 75,
    "practicalExperimental": 90,
    "systemObject": 70,
    "researchCommercial": 5,
    "futureEveryday": 10
  },
  "links": [
    {
      "label": {
        "en": "RCA 2023 Graduate Showcase",
        "cn": "RCA 2023 毕业展项目页"
      },
      "url": "https://2023.rca.ac.uk/students/ye-jian/"
    }
  ],
  "sections": [
    {
      "title": {
        "en": "A Tool That Evaluates Its User",
        "cn": "评估使用者的工具"
      },
      "content": {
        "en": "PATH reframes internet work as a tactile relationship between a person and a system that continuously evaluates them. By observing touch behavior and translating it into light, color, and surface deformation, the apparatus asks whether the internet remains a tool for people, or whether its users have become tools of the system.",
        "cn": "PATH 将网络工作重新理解为人与系统之间持续被评估的触觉关系。装置通过观察触摸行为，并将其转译为灯光、颜色与表面形变，追问互联网究竟仍是人的工具，还是使用者已经成为系统的工具。"
      },
      "fullWidthMedia": true,
      "video": "assets/portfolio/path/demo.mp4",
      "images": [
        {
          "src": "assets/portfolio/path/intro-followup.jpg",
          "alt": {
            "en": "PATH prototype interaction beside the keyboard",
            "cn": "PATH 原型与键盘旁的交互场景"
          },
          "caption": {
            "en": "Prototype testing context showing the device beside the keyboard during interaction.",
            "cn": "原型在键盘旁的交互测试场景。"
          }
        }
      ],
      "caption": {
        "en": "Project demo: PATH observes touch behavior and translates it into light and physical feedback.",
        "cn": "项目演示：PATH 观察触摸行为，并将其转译为灯光与物理反馈。"
      }
    },
    {
      "title": {
        "en": "Literature Supports and Model Tests",
        "cn": "文献支持与模型测试"
      },
      "content": {
        "en": "Early research combined literature review, behavior observation, and low-fidelity model testing. These studies helped define which mouse and cursor behaviors could be translated into PATH's sensing and feedback rules.",
        "cn": "早期研究结合了文献梳理、行为观察与低保真模型测试。这些材料帮助界定哪些鼠标与光标行为可以被转译为 PATH 的感知与反馈规则。"
      },
      "images": [
        {
          "src": "assets/portfolio/path/literature-model-test-01.jpg",
          "alt": {
            "en": "PATH observation and model test board",
            "cn": "PATH 行为观察与模型测试板"
          },
          "caption": {
            "en": "Observation and model testing used to connect mouse behavior with tactile sensing.",
            "cn": "通过行为观察与模型测试，将鼠标行为与触觉感知建立联系。"
          }
        },
        {
          "src": "assets/portfolio/path/literature-model-test-02.jpg",
          "alt": {
            "en": "PATH literature support notes on mouse movement speed and hesitation",
            "cn": "PATH 关于鼠标移动速度与停顿时间的文献支持"
          },
          "caption": {
            "en": "Literature support for movement speed, hesitation pause time, and click frequency.",
            "cn": "关于移动速度、停顿时间与点击频率的文献支持。"
          }
        },
        {
          "src": "assets/portfolio/path/literature-model-test-03.jpg",
          "alt": {
            "en": "PATH literature support and regression model references",
            "cn": "PATH 文献支持与回归模型参考"
          },
          "caption": {
            "en": "Research references linking cursor behavior and keyboard or mouse variables with personality and emotional states.",
            "cn": "将光标行为、键鼠变量与人格及情绪状态关联起来的研究参考。"
          }
        }
      ]
    },
    {
      "title": {
        "en": "Code of Conduct",
        "cn": "行为准则"
      },
      "content": {
        "en": "PATH presents its evaluation logic as a code of conduct: movement speed, trajectory, hesitation time, and click frequency become behavioral rules that the apparatus reads and translates into feedback.",
        "cn": "PATH 将评估逻辑落实为行为准则：移动速度、轨迹、停顿时间与点击频率成为装置读取并转译为反馈的规则。"
      },
      "images": [
        {
          "src": "assets/portfolio/path/introduction.png",
          "alt": {
            "en": "PATH code of conduct system board",
            "cn": "PATH 行为准则系统说明板"
          },
          "caption": {
            "en": "Code of conduct board showing the apparatus composition, manipulation logic, light layer, and behavioral mappings.",
            "cn": "行为准则说明板，展示装置构成、操作逻辑、光层与行为映射。"
          }
        },
        {
          "src": "assets/portfolio/path/archive-title.jpg",
          "alt": {
            "en": "PATH identity cover and exploded apparatus illustration",
            "cn": "PATH 标识封面与爆炸结构图"
          },
          "caption": {
            "en": "Identity cover with the exploded apparatus drawing.",
            "cn": "带有爆炸结构图的 PATH 识别封面。"
          }
        }
      ]
    },
    {
      "title": {
        "en": "Validation Design",
        "cn": "验证设计"
      },
      "content": {
        "en": "The validation task combined cursor trajectory, click frequency, touch-zone color, and total task time. These signals were used as a simple behavioral model for translating interaction patterns into a real-time assessment of focus, confidence, and task readiness.",
        "cn": "验证任务结合了光标轨迹、点击频率、触摸区域颜色与任务总时长，将这些信号组成简化的行为模型，用于把交互模式转译为对专注度、信心与任务准备状态的实时判断。"
      },
      "images": [
        {
          "src": "assets/portfolio/path/validation.png",
          "alt": {
            "en": "PATH behavioral validation logic",
            "cn": "PATH 行为验证逻辑"
          },
          "caption": {
            "en": "Validation logic combining touch-zone color, click count, and total task time.",
            "cn": "验证逻辑结合触摸区域颜色、点击次数与任务总时长。"
          }
        },
        {
          "src": "assets/portfolio/path/user-task.png",
          "alt": {
            "en": "PATH user task trajectories",
            "cn": "PATH 用户任务轨迹"
          },
          "caption": {
            "en": "Participant task trajectories captured during the validation process.",
            "cn": "验证过程中的参与者任务轨迹记录。"
          }
        },
        {
          "src": "assets/portfolio/path/behavior-map.jpg",
          "alt": {
            "en": "PATH coloured touch trajectory map",
            "cn": "PATH 彩色触摸轨迹图"
          },
          "caption": {
            "en": "Behaviour map showing how trajectory, duration, and route complexity were translated into readable interaction evidence.",
            "cn": "行为图：将轨迹、时长与路径复杂度转译为可阅读的交互证据。"
          }
        }
      ]
    },
    {
      "title": {
        "en": "Validation Test",
        "cn": "验证测试"
      },
      "content": {
        "en": "The validation test collected participant scores, trajectory recordings, screen captures, and post-test comments to evaluate whether PATH's color feedback made users feel monitored and judged.",
        "cn": "验证测试汇总了参与者评分、轨迹记录、屏幕录制与测试后反馈，用于评估 PATH 的颜色反馈是否会让用户感到被监测和被评判。"
      },
      "image": "assets/portfolio/path/validation-test.png",
      "imageAlt": {
        "en": "PATH validation test participant records and feedback",
        "cn": "PATH 验证测试参与者记录与反馈"
      },
      "caption": {
        "en": "Participant scores, trajectory records, and post-test feedback from the validation study.",
        "cn": "验证测试中的参与者评分、轨迹记录与反馈。"
      }
    },
    {
      "title": {
        "en": "Material Test",
        "cn": "材料测试"
      },
      "content": {
        "en": "Material testing explored surface treatment, folding behavior, and prototype handling before PATH became an interactive evaluation setup.",
        "cn": "材料测试围绕表面处理、折叠方式与原型操作展开，为后续交互评估装置搭建提供触感与结构依据。"
      },
      "images": [
        {
          "src": "assets/portfolio/path/material-test-01.jpg",
          "alt": {
            "en": "PATH material test sample documentation",
            "cn": "PATH 材料测试样本记录"
          },
          "caption": {
            "en": "Surface and folding samples from material testing.",
            "cn": "材料测试中的表面与折叠样本。"
          }
        },
        {
          "src": "assets/portfolio/path/material-test-02.jpg",
          "alt": {
            "en": "PATH material test process documentation",
            "cn": "PATH 材料测试过程记录"
          },
          "caption": {
            "en": "Prototype handling record from the material testing process.",
            "cn": "材料测试过程中的原型操作记录。"
          }
        }
      ]
    },
    {
      "title": {
        "en": "Additional Touch Study",
        "cn": "补充触摸研究"
      },
      "content": {
        "en": "Two short motion studies document how touch interaction changes the light response: holding the surface produces a sustained color shift, while repeated clicking creates a smaller, pulsing color variation.",
        "cn": "两段动态研究记录了触摸交互如何改变灯光反馈：按住表面会产生持续的颜色变化，而连续点击则形成更小的脉冲式变色。"
      },
      "videos": [
        {
          "src": "assets/portfolio/path/touch-hold-color.mp4",
          "caption": {
            "en": "Holding touch: sustained color change.",
            "cn": "按住触摸：持续变色。"
          }
        },
        {
          "src": "assets/portfolio/path/touch-click-color.mp4",
          "caption": {
            "en": "Clicking touch: smaller pulsing color change.",
            "cn": "点击触摸：小幅脉冲变色。"
          }
        }
      ]
    }
  ]
};
