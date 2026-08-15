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
    { headline: 'PR者的神秘仓库', body: '著名项目负责人KMXT发现仓库PR者LTSXx的“神秘仓库”' },
    { headline: '小狗每天准时在公交站等待主人下班', body: '周边居民早已习惯这一幕，不少路人会停下来投喂零食，成为街区暖心风景。' },
    { headline: '爱好者耗时两年复原古代木制机关鸟', body: '无需电力依靠齿轮传动可以自主飞行数十米，引来大量游客前来参观打卡。' },
    { headline: '大学生宿舍培育多肉，阳台变身小型植物园', body: '品种多达上百种，室友分工浇水养护，走红校园社交平台。' },
    { headline: '垂钓爱好者意外钓上巨型乌龟，拍照后原地放生', body: '专家称该乌龟生长年限久远，市民呼吁大家文明垂钓、保护野生动物。' },
    { headline: '奶茶店推出奇葩限定口味，臭豆腐奶茶引发热议', body: '不少勇敢市民前去尝试，评价两极分化，有人直呼上头，有人难以接受。' },
    { headline: '老爷爷自学短视频剪辑，记录自家小院四季风景', body: '视频朴实治愈，收获数万网友关注，大家纷纷羡慕悠然自在的田园生活。' },
    { headline: '鹦鹉学会模仿门铃，经常捉弄上门快递员', body: '主人多次纠正无果，快递员常常被虚假门铃骗到，哭笑不得。' },
    { headline: '骑行爱好者沿途收集各地特色明信片，计划走遍全国', body: '每到一座城市就寄出一张给自己，如今已经攒下满满一大盒。' },
    { headline: '夜市摊主自制巨型棉花糖，造型堪比云朵吸引孩童', body: '摊位前长期排起长队，成为夜市标志性打卡点。' },
    { headline: '两只流浪小狗互相取暖，路人自发搭建简易避雨小屋', body: '爱心市民持续投喂，不少网友希望能够给它们找到合适领养家庭。' },
    { headline: '手工达人使用废旧瓶盖制作巨型壁画', body: '耗费上万枚瓶盖，色彩绚丽，在社区广场展出收获大量好评。' },
    { headline: '男生为躲避相亲，谎称外出旅游，结果在本地商场偶遇亲戚', body: '当场社死，男生表示以后再也不敢随便编造借口。' },
    { headline: '铲屎官给猫咪网购小头盔，猫咪戴上之后寸步不肯移动', body: '猫咪呆坐原地满脸抗拒，仿佛受到巨大屈辱。' },
    { headline: '大学生通宵追剧，第二天上课戴着眼罩继续补觉', body: '老师路过见状不忍打扰，悄悄调低了讲课音量。' },
    { headline: '水果店老板自学花式切果，西瓜雕刻各种卡通形象', body: '不少顾客专门前来拍照，水果销量一路走高。' },
    { headline: '流浪橘猫霸占便利店收银台，成为非正式“店宠”', body: '店长每天提供猫粮，顾客进店总忍不住先撸猫。' },
    { headline: '玩家苦练三年飞盘，失手砸中自家晾晒的棉被', body: '棉被坠入池塘，当事人懊悔不已，被朋友拍下视频广为流传。' },
    { headline: '书店设立安静撸猫角，吸引大批年轻人前往打卡', body: '店家规定不许大声喧哗，读书撸猫两不误。' },
    { headline: '大叔苦练口哨模仿鸟鸣，引来成群小鸟落在阳台', body: '每天清晨阳台百鸟齐聚，邻居纷纷前来围观。' },
    { headline: '女生网购网红发光拖鞋，夜里走路被路人当成夜光小精灵', body: '夜晚走在路上回头率爆表。' },
    { headline: '小学生为仓鼠打造豪华多层别墅，材料全部来自快递纸箱', body: '水电、跑轮、卧室一应俱全，家长直呼想象力惊人。' },
    { headline: '外卖小哥顺路救下落水小狗，送完订单才想起浑身湿透', body: '网友称赞这是最有爱心的外卖骑手。' },
    { headline: '公园大爷开展毽子挑战赛，连续击败数十名年轻人', body: '大爷放话：有空随时来公园切磋技艺。' },
    { headline: '网友尝试自制星空蛋糕，成品外观酷似火山岩浆', body: '味道尚可，颜值彻底翻车，自嘲黑暗料理天花板。' },
    { headline: '哈士奇偷偷溜出门散步，认不出回家路线蹲路边求助路人', body: '民警联系主人前来认领，狗狗回家之后挨了一顿批评。' },
    { headline: '图书馆出现热心志愿者，主动提醒大家不要抖腿', body: '不少读者表示深受困扰，也有人觉得太过较真。' },
    { headline: '露营爱好者突发奇想，用石头搭建简易户外灶台', body: '成功煮出一锅泡面，称野外生存技能get。' },
    { headline: '广场舞团队新增国风曲目，舞姿优美吸引年轻人驻足拍摄', body: '越来越多年轻网友主动加入队伍一起跳舞。' },
    { headline: '宠物兔子学会自己开门，经常偷偷溜到客厅啃绿植', body: '主人多次加固门锁，依旧挡不住聪明小兔。' },
    { headline: '收藏家积攒二十余年汽水标签，装满数十本收藏册', body: '市面上绝版标签应有尽有，不少爱好者上门交流。' },
    { headline: '雨天路人自发排成一排，轮流撑伞护送老人过马路', body: '温暖一幕被路人拍下，在社交平台广泛传播。' },
    { headline: '青年自制迷你蒸汽小火车，能够在自家小院轨道行驶', body: '依靠烧水产生动力，邻居小孩天天准时前来观看。' },
    { headline: '烧烤摊推出盲盒烤串，抽到什么全凭运气', body: '有人抽到年糕，有人抽到奇特食材，趣味性拉满。' },
    { headline: '柯基每次出门必捡树枝，家里已经堆满大大小小木棍', body: '主人无奈吐槽，家里快要没有地方存放战利品。' },
    { headline: '自习室设置零食交换角，大家自由置换闲置小零食', body: '陌生学子互相分享，学习氛围更加融洽。' },
    { headline: '渔夫出海偶遇成群海豚，海豚跟随船只相伴航行半小时', body: '渔夫称出海多年，难得遇见如此壮观景象。' },
    { headline: '手工博主用黏土复刻各类网红小吃，真假难以分辨', body: '不少网友留言，差点以为是可以直接食用的美食。' },
    { headline: '小区锦鲤被投喂过度，体型发胖游起来十分笨拙', body: '物业贴出告示，呼吁居民不要过量喂食。' },
    { headline: '骑行小队沿途捡拾路边垃圾，开展环保骑行活动', body: '一边欣赏风景一边清洁道路，收获众多网友点赞。' },
    { headline: '男生学习魔术准备惊喜告白，表演中途道具当场失灵', body: '场面十分尴尬，好在女生依旧接受了表白。' },
    { headline: '花店老板培育变色月季，一天之内呈现多种花色', body: '独特品种吸引大量游客进店观赏选购。' },
    { headline: '乌龟持续五年准时等待投喂，生物钟比闹钟还精准', body: '一到饭点主动爬到饲养箱门口等候食物。' },
    { headline: '网友挑战连续三十天早睡，坚持一周宣告失败', body: '自嘲熬夜早已刻进DNA，早睡计划宣布破产。' },
    { headline: '山间民宿打造星空观景台，夜晚吸引游客上山观赏银河', body: '天气晴朗时肉眼就能看见漫天繁星。' },
    { headline: '小朋友给流浪猫制作防雨小窝，铺上柔软旧衣物', body: '猫咪顺利入住，每天等待小朋友放学见面。' },
    { headline: '街头艺人用水墨书法现场作画，音乐搭配笔墨氛围感十足', body: '路过行人纷纷驻足，拿出手机记录画面。' },
    { headline: '大学生组建树叶绘画社团，利用落叶创作各类风景画', body: '作品在校内展览，充满自然创意。' },
    { headline: '车主放置自助矿泉水，留给户外环卫工人免费取用', body: '无人看管全凭自觉，数月以来秩序良好。' },
    { headline: '龙猫囤积大量干草藏在窝里，打造专属储藏室', body: '主人清理巢穴时，翻出满满一堆存货。' },
    { headline: '水上乐园游客自发组织泼水大赛，欢声笑语不断', body: '工作人员并未制止，现场气氛热闹非凡。' },
    { headline: '古风爱好者身着汉服逛市集，仿佛穿越古代街巷', body: '路人纷纷拍照，营造浓厚国风氛围。' },
    { headline: '面包店每日临近关门免费赠送剩余面包，杜绝食物浪费', body: '需要的市民可以自行领取，传递温暖善意。' },
    { headline: '松鼠频繁造访居民阳台，偷偷搬运坚果储存过冬粮食', body: '居民贴心放置坚果，和小松鼠友好相处。' },
    { headline: '台球馆举办趣味挑战赛，获胜奖品是奶茶套餐', body: '吸引大批年轻爱好者踊跃参与比拼。' },
    { headline: '手作蜡烛工坊支持顾客自由调配香薰味道，定制专属蜡烛', body: '不少情侣结伴前来制作纪念手作。' },
    { headline: '登山爱好者山顶写下心愿纸条，封存进石头缝隙之中', body: '约定数年之后再次登山回来开启愿望。' },
    { headline: '柴犬看见镜子里的自己，持续对峙半小时不肯离开', body: '时而低吼时而歪头，始终无法理解镜像奥秘。' },
    { headline: '社区开办旧物交换市集，闲置物品互相流转再利用', body: '书籍、玩具、生活用品均可交换，提倡绿色生活。' },
    { headline: '乐队街头即兴演奏，路过行人自发合唱形成大合唱', body: '温暖治愈的一幕被路人拍摄上传网络。' },
    { headline: '多肉爱好者搭建露天花房，抵御高温守护盆栽植株', body: '每日定时遮阳喷水，悉心照料上百盆植物。' },
    { headline: '垂钓者钓到一条巨型金鱼，拍照留念后立即放生湖中', body: '认为大鱼寓意吉祥，不愿将其带走饲养。' },
    { headline: '自习考生互相分享提神薄荷糖，陌生考生互帮互助', body: '小小的糖果，拉近了备考学子之间的距离。' },
    { headline: '农场小羊喜欢跟随游客散步，主动蹭人讨要菜叶投喂', body: '性格温顺亲人，成为农场人气小动物。' },
    { headline: '自制夜光风筝飞上夜空，夜晚在空中闪闪发光格外吸睛', body: '广场上所有人目光都被这只独特风筝吸引。' },
    { headline: '面馆老板记住常客口味，客人进门无需多说直接上菜', body: '熟客称赞这家小店充满人情味。' },
    { headline: '鹦鹉痴迷模仿手机铃声，家中经常响起虚假来电提示音', body: '主人常常慌忙寻找手机，最后发现是鹦鹉恶作剧。' },
    { headline: '骑行爱好者收集各地路标照片，制作成长途旅行相册', body: '每一张照片，都记录一段沿途见闻。' },
    { headline: '夜市手工糖画摊主，可以根据顾客需求绘制动漫角色', body: '小朋友争相排队，想要获得喜欢的卡通糖画。' },
    { headline: '流浪猫结伴蹲守早餐店门口，等待老板投喂早餐残渣', body: '老板长期投喂，猫咪每天准时前来报到。' },
    { headline: '大学生尝试宿舍自制烤鱼，香味引来隔壁宿舍同学蹭饭', body: '室友凑钱采购食材，成功完成宿舍美食盛宴。' },
    { headline: '湖边白鹭习惯游客投喂，远远看见有人靠近便主动飞来', body: '提醒游客文明观赏，不要随意投喂外来食物。' },
    { headline: '拼图爱好者完成上万片巨型风景拼图，耗时整整一个月', body: '成品铺满整个客厅，成就感满满。' },
    { headline: '共享图书角设立在小区凉亭，居民自由借阅无需登记', body: '大家自觉爱护书籍，形成良好阅读氛围。' },
    { headline: '边牧拥有超高智商，能够听懂主人指令帮忙捡拾垃圾', body: '出门散步顺带清理路边废弃物，被网友称为环保小狗。' },
    { headline: '冷饮店推出季节限定花草冰饮，颜值清新广受女生喜爱', body: '花草搭配冰块，拍照发社交平台十分出片。' },
    { headline: '徒步队伍山中偶遇野生猕猴，远远观望互不打扰', body: '驴友提醒大家不要近距离投喂野生动物。' },
    { headline: '陶艺体验店顾客自由捏制陶器，成品可以烧制带走留念', body: '很多情侣选择一起制作一对陶瓷杯子。' },
    { headline: '大爷打造空中菜园，楼顶种植各类蔬菜瓜果自给自足', body: '蔬果长势喜人，经常分给邻里亲友品尝。' },
    { headline: '猫咪喜欢趴在电脑主机上取暖，多次打断主人工作', body: '主人无可奈何，只能额外给小猫准备保暖小窝。' },
    { headline: '街头涂鸦艺术家在合法墙面创作治愈风景画，美化老旧街区', body: '原本灰暗墙壁焕然一新，成为新晋打卡地点。' },
    { headline: '露营玩家收集枯木搭建篝火，夜晚围坐一起分享小故事', body: '远离手机屏幕，享受安静惬意的户外时光。' },
    { headline: '仓鼠偷偷囤积粮食，腮帮子塞满食物走路晃晃悠悠', body: '模样呆萌可爱，吸引大量网友围观视频。' },
    { headline: '小孩也会用AI', body: '自写1000行代码的九岁“神童”被打假全靠AI写代码。网友“豆包没了能急哭”' },
    { headline: '社区举办风筝大赛，各式各样创意风筝飞上蓝天', body: '大人小孩齐上阵，广场充满欢声笑语。' }
]

    // 工具方法
    pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    // 获取某行业股票代码列表
    getIndustryCodes(stockData, industry) {
        const codes = [];
        stockData.forEach((data, code) => {
            if (data.industry === industry) codes.push(code);
        });
        return codes;
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
