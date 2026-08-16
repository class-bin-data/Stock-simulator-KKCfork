// 新闻模板池 - 单独文件
// 说明：
// - foreshadow  预告类：方向明确，对应股票会按 effect 方向真实波动
// - ambiguous   模棱两可类：方向随机（涨/跌），对应行业可能受影响
// - hindsight   事后诸葛亮类：在股票跌停/破产后出现，无价格影响（或仅叙事）
// - irrelevant  无关紧要类：纯娱乐新闻，不影响市场
//
// 占位符：{stock} 会被替换为对应股票名称；{industry} 会被替换为行业名称
const NewsPool = {
    // 预告类 - 明确方向
    foreshadow: [
        { industry: '银行', direction: 'down', magnitude: 0.06, headline: '{stock}被曝内部人员违规操作', body: '据内部消息，{stock}多名员工涉嫌违规操作，监管机构已介入调查，市场担忧情绪升温。' },
        { industry: '银行', direction: 'down', magnitude: 0.05, headline: '{stock}卷入重大贷款纠纷', body: '有媒体报道称，{stock}一笔巨额贷款疑似存在风控漏洞，投资者开始重新评估其资产质量。' },
        { industry: '半导体', direction: 'up', magnitude: 0.06, headline: '{stock}斩获巨额订单', body: '{stock}宣布与多家头部客户达成长期供货协议，订单金额远超市场预期，机构纷纷上调目标价。' },
        { industry: '芯片', direction: 'up', magnitude: 0.06, headline: '{stock}新一代芯片流片成功', body: '{stock}自研新一代芯片完成流片并点亮，性能大幅提升，行业地位进一步巩固。' },
        { industry: '新能源', direction: 'up', magnitude: 0.05, headline: '{stock}发布新一代技术突破', body: '{stock}宣布在核心技术上取得重大突破，量产进度超预期，引发市场追捧。' },
        { industry: '光伏', direction: 'down', magnitude: 0.06, headline: '{stock}核心设备遭出口限制', body: '海外某国拟对{stock}相关设备实施出口限制，消息传出后股价承压。' },
        { industry: '白酒', direction: 'up', magnitude: 0.05, headline: '{stock}高端产品宣布提价', body: '{stock}宣布旗下多款高端产品提价，渠道反馈良好，量价齐升逻辑得到强化。' },
        { industry: '医药', direction: 'down', magnitude: 0.06, headline: '{stock}新药临床试验不及预期', body: '{stock}公告其核心在研新药临床试验数据未达主要终点，研发管线不确定性上升。' },
        { industry: '食品', direction: 'down', magnitude: 0.06, headline: '{stock}被曝食品安全问题', body: '有消费者投诉{stock}旗下产品存在质量隐患，公司回应称正在核实，但舆论压力不小。' },
        { industry: '券商', direction: 'up', magnitude: 0.05, headline: '{stock}月度业绩大幅超预期', body: '{stock}披露最新月度经营数据，营收与利润均大幅超预期，市场情绪转暖。' },
        { industry: '汽车', direction: 'up', magnitude: 0.05, headline: '{stock}与科技巨头达成战略合作', body: '{stock}宣布与某科技巨头在智能化领域展开深度合作，协同效应可期。' },
        { industry: '家电', direction: 'up', magnitude: 0.05, headline: '{stock}海外订单需求激增', body: '{stock}海外市场订单持续放量，出口数据亮眼，机构看好其全球化布局。' },
        { industry: '房地产', direction: 'down', magnitude: 0.06, headline: '{stock}再融资遇阻', body: '监管趋严背景下，{stock}再融资计划推进受阻，市场担忧其资金链压力。' },
        { industry: '人工智能', direction: 'up', magnitude: 0.06, headline: '{stock}大模型产品获重磅客户认可', body: '{stock}自研大模型产品接连签约重磅客户，商业化落地加速，景气度上行。' },
        { industry: '通信', direction: 'up', magnitude: 0.05, headline: '{stock}中标重大通信项目', body: '{stock}成功中标国家级重大通信基础设施项目，订单确定性增强。' }
    ],

    // 模棱两可类 - 方向随机
    ambiguous: [
        { industry: '半导体', direction: 'random', magnitude: 0.04, headline: '专家称：{industry}行业可能成为未来的增长引擎', body: '多位分析师认为{industry}行业前景广阔，但也有观点认为当前估值已经透支未来，多空分歧明显。' },
        { industry: '芯片', direction: 'random', magnitude: 0.04, headline: '机构观点分歧：{industry}板块估值之争', body: '关于{industry}板块是否高估，两大机构隔空论战，市场跟随摇摆。' },
        { industry: '人工智能', direction: 'random', magnitude: 0.04, headline: '{industry}赛道迎来政策风口？', body: '有传闻称相关支持政策正在酝酿，但尚未得到官方证实，消息真假难辨。' },
        { industry: '新能源', direction: 'random', magnitude: 0.04, headline: '产能过剩担忧再起，{industry}板块走势存疑', body: '一边是需求持续增长，一边是产能扩张加速，{industry}行业的供需平衡成为市场争论焦点。' },
        { industry: '光伏', direction: 'random', magnitude: 0.04, headline: '{industry}价格战传闻蔓延', body: '市场传闻{industry}行业价格竞争加剧，若属实将压缩利润，若被证伪则利空出尽。' },
        { industry: '医药', direction: 'random', magnitude: 0.04, headline: '{industry}政策动向不明', body: '业内对{industry}行业新一轮政策走向看法不一，资金观望情绪浓厚。' },
        { industry: '生物制药', direction: 'random', magnitude: 0.04, headline: '{industry}创新药出海前景引发热议', body: '一批{industry}企业传出海外授权进展，但最终能否兑现仍是未知数。' },
        { industry: '食品', direction: 'random', magnitude: 0.04, headline: '消费复苏预期反复，{industry}板块承压还是起飞？', body: '消费数据时好时坏，{industry}行业复苏节奏存在较大不确定性，多空各执一词。' },
        { industry: '汽车', direction: 'random', magnitude: 0.04, headline: '{industry}智能化竞争加剧', body: '新一轮价格战与智能化军备赛同时上演，{industry}行业格局重塑方向尚不明朗。' },
        { industry: '金融科技', direction: 'random', magnitude: 0.04, headline: '{industry}监管新规传闻来袭', body: '市场流传{industry}行业将迎来新的监管细则，影响程度有待评估。' }
    ],

    // 事后诸葛亮类 - 需跌停/破产的股票
    hindsight: [
        { headline: '{stock}惨遭破产清算', body: '在连续暴跌之后，{stock}最终未能挺过流动性危机，正式进入破产清算程序，留下一地鸡毛。' },
        { headline: '{stock}跌停背后：一切早有预兆', body: '复盘来看，{stock}此前的财报与公告早已暗藏隐患，只是当时鲜有人在意。' },
        { headline: '{stock}“闪崩”之后何去何从', body: '经历本轮暴跌，{stock}投资者损失惨重，市场对其后续走向普遍悲观。' },
        { headline: '{stock}退市传闻终于坐实', body: '伴随着股价跌停，{stock}退市相关传闻被证实，昔日明星股风光不再。' }
    ],

    // 无关紧要类 - 纯娱乐
    irrelevant: [
        { headline: '餐馆遭遇大火，男子坚持在座位上多吃一口', body: '火势凶猛浓烟滚滚，该男子却表示“不能浪费”，坚持吃完最后一口才撤离，堪称美食的守护者。' },
        { headline: '某市民因宠物猫上树，消防队出动三次', body: '同一只猫一周内三次上树，消防员调侃“它比我们还熟悉救援流程”。' },
        { headline: '科学家发现：笑一笑十年少，哭一哭十年老', body: '最新研究证实了这句老话的科学依据，网友们纷纷表示“那我天天笑”。' },
        { headline: '小区大爷用无人机给孙子送饭，引发围观', body: '大爷操作熟练、技术精湛，邻居们看得目瞪口呆，直呼“黑科技”。' },
        { headline: '全球首只“会跳舞”的机器狗亮相', body: '该机器狗能随着音乐跳出广场舞步伐，现场观众笑声不断。' },
        { headline: '某地超市鸡蛋降价，大妈排队三小时', body: '为抢购打折鸡蛋，大妈们凌晨就守在超市门口，场面十分壮观。' },
        { headline: '男子用1000个硬币在超市买咖啡', body: '收银员表示“数钱数到手抽筋”，该男子却一脸淡定。' },
        { headline: '猫咪霸占键盘，程序员只好用脚趾敲代码', body: '“它不走我也没办法，项目不能停啊。”当事人如是说。' },
        { headline: 'PR者的神秘仓库', body: '著名项目负责人KMXT发现仓库PR者LTSXx的“神秘仓库”' }
    ],

    // 工具方法
    pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    // 行业索引缓存（懒构建：行业 → 代码列表）
    // 原实现每次新闻生成都要对 300+ 只股票做多次全量遍历，是新闻模块卡顿的主要来源之一。
    // 股票池在游戏初始化后代码/行业不再变化，因此构建一次即可长期复用。
    _industryIndex: null,

    // 构建行业索引（一次性 O(n)）
    _buildIndex(stockData) {
        const index = new Map();
        stockData.forEach((data, code) => {
            if (!index.has(data.industry)) index.set(data.industry, []);
            index.get(data.industry).push(code);
        });
        this._industryIndex = index;
        return index;
    },

    // 获取某行业股票代码列表（缓存查询 O(1)，无需重复遍历股票池）
    getIndustryCodes(stockData, industry) {
        if (!this._industryIndex) this._buildIndex(stockData);
        return this._industryIndex.get(industry) || [];
    },

    // 从行业随机选一只股票
    pickStock(stockData, industry) {
        const codes = this.getIndustryCodes(stockData, industry);
        if (!codes.length) return null;
        const code = this.pick(codes);
        return stockData.get(code);
    },

    // 寻找事后诸葛亮的目标：优先破产银行，其次当日跌停股票
    findHindsightTarget(stockData, limitManager, bankruptBanks) {
        // 1. 优先找破产银行
        if (bankruptBanks && bankruptBanks.size) {
            const codes = [...bankruptBanks];
            const code = this.pick(codes);
            const data = stockData.get(code);
            if (data) return data;
        }
        // 2. 其次找当日跌停的股票
        const limitDownCodes = [];
        stockData.forEach((data, code) => {
            if (data.prevClose > 0 && limitManager.isLimitDown(data.price, data.prevClose)) {
                limitDownCodes.push(code);
            }
        });
        if (limitDownCodes.length) {
            return stockData.get(this.pick(limitDownCodes));
        }
        return null;
    },

    // 生成一条新闻
    generate(stockData, limitManager, bankruptBanks) {
        // 权重选择类别：预告30% 模棱两可30% 事后10% 无关30%
        const roll = Math.random();
        let category;
        if (roll < 0.30) category = 'foreshadow';
        else if (roll < 0.60) category = 'ambiguous';
        else if (roll < 0.70) category = 'hindsight';
        else category = 'irrelevant';

        let template = null;
        let stock = null;
        let industry = null;
        let relatedCodes = [];

        if (category === 'foreshadow' || category === 'ambiguous') {
            // 找到有对应股票的模板
            const pool = this[category];
            const candidates = pool.filter(t => this.getIndustryCodes(stockData, t.industry).length > 0);
            if (candidates.length) {
                template = this.pick(candidates);
                industry = template.industry;
                // 模棱两可可影响行业多只股票
                const maxAffected = category === 'ambiguous' ? 3 : 1;
                const codes = this.getIndustryCodes(stockData, industry);
                const shuffled = codes.slice().sort(() => Math.random() - 0.5).slice(0, Math.min(maxAffected, codes.length));
                relatedCodes = shuffled;
                stock = stockData.get(relatedCodes[0]);
            } else {
                category = 'irrelevant';
            }
        } else if (category === 'hindsight') {
            const target = this.findHindsightTarget(stockData, limitManager, bankruptBanks);
            if (target) {
                template = this.pick(this.hindsight);
                stock = target;
                relatedCodes = [target.code];
            } else {
                category = 'irrelevant';
            }
        }

        if (category === 'irrelevant') {
            template = this.pick(this.irrelevant);
        }

        // 组装文案
        const stockName = stock ? stock.name : '某公司';
        const industryName = industry || '相关行业';
        const headline = (template.headline || '').replace(/\{stock\}/g, stockName).replace(/\{industry\}/g, industryName);
        const body = (template.body || '').replace(/\{stock\}/g, stockName).replace(/\{industry\}/g, industryName);

        // 解析效果
        let effect = null;
        if (template.direction) {
            effect = {
                direction: template.direction,   // 'up' | 'down' | 'random'
                magnitude: template.magnitude || 0.05
            };
        }

        return {
            type: category,
            headline,
            body,
            relatedCodes,
            effect
        };
    },

    // 类别中文名
    typeLabel(type) {
        const labels = {
            foreshadow: '预告',
            ambiguous: '传闻',
            hindsight: '复盘',
            irrelevant: '趣闻'
        };
        return labels[type] || '新闻';
    }
};
