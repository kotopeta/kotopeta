"use client";

import { useState, useEffect, useRef } from "react";


const popularWords = [
  { icon: "🚭", label: "禁煙" },
  { icon: "🚻", label: "トイレ" },
  { icon: "💴", label: "現金" },
  { icon: "🚪", label: "入口" },
  { icon: "🚬", label: "喫煙所" },
  { icon: "👥", label: "満席" },
];

const phrases = [
  {
  icon: "🚪",
  jp: "入口",
  tags: ["入口", "入る", "entrance"],
  en: "Entrance",
  ko: "입구",
  zh: "入口",
},
{
  icon: "🚶",
  jp: "出口",
  tags: ["出口", "出る", "exit"],
  en: "Exit",
  ko: "출구",
  zh: "出口",
},
{
  icon: "🛎️",
  jp: "受付はこちら",
  tags: ["受付", "フロント", "案内"],
  en: "Reception This Way",
  ko: "접수처는 이쪽입니다",
  zh: "接待处在这边",
},
{
  icon: "➡️",
  jp: "こちらへお進みください",
  tags: ["進む", "案内", "こちら"],
  en: "Please Proceed This Way",
  ko: "이쪽으로 이동해 주세요",
  zh: "请往这边走",
},
{
  icon: "🪑",
  jp: "こちらでお待ちください",
  tags: ["待つ", "待機", "順番"],
  en: "Please Wait Here",
  ko: "여기서 기다려 주세요",
  zh: "请在这里等候",
},
{
  icon: "👥",
  jp: "順番にお並びください",
  tags: ["並ぶ", "列", "順番"],
  en: "Please Line Up in Order",
  ko: "순서대로 줄을 서 주세요",
  zh: "请按顺序排队",
},
{
  icon: "📱",
  jp: "順番待ちの確認はこちらのQRコードから",
  tags: ["QR", "順番待ち", "確認"],
  en: "Check Your Queue Status Using This QR Code",
  ko: "대기 순서는 이 QR코드로 확인해 주세요",
  zh: "请通过此二维码查看排队顺序",
},
{
  icon: "👥",
  jp: "満席",
  tags: ["満席", "席なし", "いっぱい"],
  en: "Full",
  ko: "만석입니다",
  zh: "满座",
},
{
  icon: "🟢",
  jp: "営業中",
  tags: ["営業", "開店", "open"],
  en: "Open",
  ko: "영업 중",
  zh: "营业中",
},
{
  icon: "🔴",
  jp: "本日は終了しました",
  tags: ["終了", "閉店", "営業終了"],
  en: "Closed for Today",
  ko: "오늘 영업은 종료되었습니다",
  zh: "今日营业结束",
},
{
  icon: "💴",
  jp: "現金のみ",
  tags: ["現金", "支払い", "cash"],
  en: "Cash Only",
  ko: "현금 결제만 가능합니다",
  zh: "仅限现金支付",
},
{
  icon: "💳",
  jp: "クレジットカード利用可",
  tags: ["カード", "クレジット", "支払い"],
  en: "Credit Cards Accepted",
  ko: "신용카드 결제 가능합니다",
  zh: "可使用信用卡",
},
{
  icon: "📱",
  jp: "電子決済利用可",
  tags: ["電子決済", "QR決済", "pay"],
  en: "Electronic Payment Accepted",
  ko: "전자결제 가능합니다",
  zh: "可使用电子支付",
},
{
  icon: "➗",
  jp: "割り勘できます",
  tags: ["割り勘", "別会計", "支払い"],
  en: "Split Payments Available",
  ko: "나누어 계산 가능합니다",
  zh: "可以分开付款",
},
{
  icon: "❌",
  jp: "割り勘はできません",
  tags: ["割り勘", "別会計", "支払い"],
  en: "Split Payments Not Available",
  ko: "나누어 계산은 불가합니다",
  zh: "无法分开付款",
},
{
  icon: "💰",
  jp: "先払い制です",
  tags: ["先払い", "前払い", "支払い"],
  en: "Payment in Advance",
  ko: "선불제입니다",
  zh: "请先付款",
},
{
  icon: "🧾",
  jp: "後払い制です",
  tags: ["後払い", "会計", "支払い"],
  en: "Pay After Service",
  ko: "후불제입니다",
  zh: "请于服务后付款",
},
{
  icon: "🏧",
  jp: "お支払いはレジにてお願いします",
  tags: ["レジ", "会計", "支払い"],
  en: "Please Pay at the Register",
  ko: "계산은 카운터에서 부탁드립니다",
  zh: "请在收银台付款",
},
{
  icon: "🧾",
  jp: "領収書発行できます",
  tags: ["領収書", "レシート", "receipt"],
  en: "Receipts Available",
  ko: "영수증 발급 가능합니다",
  zh: "可开具收据",
},
{
  icon: "🆓",
  jp: "ご自由にお取りください",
  tags: ["自由", "セルフ", "持っていく"],
  en: "Please Help Yourself",
  ko: "자유롭게 가져가세요",
  zh: "请自由取用",
},
{
  icon: "🚫",
  jp: "飲食禁止",
  tags: ["飲食", "食べる", "飲む", "禁止"],
  en: "No Food or Drinks",
  ko: "음식물 반입 및 섭취 금지",
  zh: "禁止饮食",
},
{
  icon: "🥡",
  jp: "お持ち込みはご遠慮ください",
  tags: ["持ち込み", "持込", "外部の飲食物"],
  en: "Outside Food and Drinks Not Allowed",
  ko: "외부 음식물 반입은 삼가 주세요",
  zh: "请勿携带外带食品饮料入内",
},
{
  icon: "💸",
  jp: "食べ残しが多い場合、追加料金をいただく場合があります",
  tags: ["食べ残し", "残す", "追加料金", "食べ放題"],
  en: "Additional Charges May Apply for Excessive Leftovers",
  ko: "음식을 많이 남기실 경우 추가 요금이 발생할 수 있습니다",
  zh: "剩余食物过多时，可能会收取额外费用",
},
{
  icon: "🚫",
  jp: "二度付け禁止",
  tags: ["二度付け", "ソース", "串カツ"],
  en: "No Double Dipping",
  ko: "두 번 찍기 금지",
  zh: "禁止二次蘸取",
},
{
  icon: "🍽️",
  jp: "お一人様一品以上のご注文をお願いします",
  tags: ["一人一品", "注文", "人数分"],
  en: "Please Order at Least One Item Per Person",
  ko: "1인 1메뉴 이상 주문 부탁드립니다",
  zh: "请每位顾客至少点一份餐品",
},
{
  icon: "⏰",
  jp: "混雑時はお席のご利用時間を制限させていただく場合があります",
  tags: ["混雑", "時間制限", "席"],
  en: "Seating Time May Be Limited During Busy Hours",
  ko: "혼잡 시 좌석 이용 시간이 제한될 수 있습니다",
  zh: "繁忙时段可能限制用餐时间",
},
{
  icon: "🙋",
  jp: "セルフサービスです",
  tags: ["セルフ", "自分で", "self"],
  en: "Self-Service",
  ko: "셀프서비스입니다",
  zh: "请自助服务",
},
{
  icon: "💧",
  jp: "お水はセルフサービスです",
  tags: ["水", "セルフ", "無料"],
  en: "Water Is Self-Service",
  ko: "물은 셀프서비스입니다",
  zh: "饮用水请自取",
},
{
  icon: "🔥",
  jp: "熱いのでご注意ください",
  tags: ["熱い", "やけど", "注意"],
  en: "Caution: Hot",
  ko: "뜨거우니 주의해 주세요",
  zh: "高温注意",
},
{
  icon: "⚠️",
  jp: "アレルギーをお持ちの方はお申し付けください",
  tags: ["アレルギー", "食材", "相談"],
  en: "Please Inform Us of Any Food Allergies",
  ko: "알레르기가 있으신 분은 말씀해 주세요",
  zh: "如有食物过敏，请提前告知",
},
{
  icon: "🚻",
  jp: "トイレ",
  tags: ["トイレ", "お手洗い", "化粧室"],
  en: "Restroom",
  ko: "화장실",
  zh: "洗手间",
},
{
  icon: "🚹",
  jp: "男性用",
  tags: ["男性", "男", "メンズ"],
  en: "Men",
  ko: "남성용",
  zh: "男士专用",
},
{
  icon: "🚺",
  jp: "女性用",
  tags: ["女性", "女", "レディース"],
  en: "Women",
  ko: "여성용",
  zh: "女士专用",
},
{
  icon: "♿",
  jp: "多目的トイレ",
  tags: ["多目的", "バリアフリー", "車椅子"],
  en: "Accessible Restroom",
  ko: "다목적 화장실",
  zh: "无障碍洗手间",
},
{
  icon: "🚫",
  jp: "使用中",
  tags: ["使用中", "入ってます", "occupied"],
  en: "Occupied",
  ko: "사용 중",
  zh: "使用中",
},
{
  icon: "🚽",
  jp: "使用後は水を流してください",
  tags: ["流す", "トイレ", "使用後"],
  en: "Please Flush After Use",
  ko: "사용 후 물을 내려 주세요",
  zh: "使用后请冲水",
},
{
  icon: "🚽",
  jp: "生理用品以外は流さないでください",
  tags: ["流さない", "トイレ", "生理用品"],
  en: "Do Not Flush Anything Except Toilet Paper",
  ko: "화장지 외에는 변기에 버리지 말아 주세요",
  zh: "除厕纸外请勿冲入马桶",
},
{
  icon: "🗑️",
  jp: "生理用品以外は捨てないでください",
  tags: ["ゴミ箱", "サニタリー", "生理用品"],
  en: "Do Not Dispose of Anything Other Than Sanitary Products",
  ko: "생리용품 외에는 버리지 말아 주세요",
  zh: "除卫生用品外，请勿投入其他垃圾",
},
{
  icon: "🧼",
  jp: "手を洗ってください",
  tags: ["手洗い", "衛生", "洗う"],
  en: "Please Wash Your Hands",
  ko: "손을 씻어 주세요",
  zh: "请洗手",
},
{
  icon: "✨",
  jp: "清潔にご利用ください",
  tags: ["清潔", "きれい", "マナー"],
  en: "Please Keep It Clean",
  ko: "깨끗하게 이용해 주세요",
  zh: "请保持清洁",
},
{
  icon: "👟",
  jp: "靴を脱いでお入りください",
  tags: ["靴", "脱ぐ", "土足禁止", "入る"],
  en: "Please Remove Your Shoes Before Entering",
  ko: "신발을 벗고 들어와 주세요",
  zh: "请脱鞋后进入",
},
{
  icon: "🚫",
  jp: "土足禁止",
  tags: ["土足", "靴", "禁止"],
  en: "No Shoes Allowed",
  ko: "신발 착용 금지",
  zh: "禁止穿鞋进入",
},
{
  icon: "🧳",
  jp: "大きなお荷物の持ち込みはご遠慮ください",
  tags: ["荷物", "キャリーケース", "スーツケース", "大きい荷物"],
  en: "Please Refrain from Bringing Large Luggage",
  ko: "큰 짐 반입은 삼가 주세요",
  zh: "请勿携带大型行李入内",
},
{
  icon: "🛁",
  jp: "タトゥーのある方はご利用いただけません",
  tags: ["タトゥー", "刺青", "温泉", "入浴"],
  en: "Guests with Tattoos Are Not Allowed",
  ko: "문신이 있는 분은 이용하실 수 없습니다",
  zh: "有纹身者谢绝使用",
},
{
  icon: "📵",
  jp: "浴場内での携帯電話の使用は禁止です",
  tags: ["温泉", "浴場", "携帯電話", "撮影"],
  en: "Mobile Phones Are Not Allowed in the Bath Area",
  ko: "욕장 내 휴대전화 사용 금지",
  zh: "浴场内禁止使用手机",
},
{
  icon: "🚿",
  jp: "場所取りはご遠慮ください",
  tags: ["場所取り", "席取り", "荷物", "シャワー"],
  en: "Please Do Not Reserve Spots",
  ko: "자리 맡기는 삼가 주세요",
  zh: "请勿占位",
},
{
  icon: "♨️",
  jp: "入浴前にかけ湯をお願いします",
  tags: ["かけ湯", "入浴", "温泉", "マナー"],
  en: "Please Rinse Yourself Before Entering the Bath",
  ko: "입욕 전에 몸을 먼저 헹궈 주세요",
  zh: "入浴前请先冲洗身体",
},
{
  icon: "🎨",
  jp: "髪を染めないでください",
  tags: ["髪", "染める", "カラー", "温泉"],
  en: "Please Do Not Dye Your Hair Here",
  ko: "이곳에서 염색은 삼가 주세요",
  zh: "请勿在此染发",
},
{
  icon: "📱",
  jp: "チェックインはこちらのQRコードから",
  tags: ["チェックイン", "QR", "受付"],
  en: "Check In Using This QR Code",
  ko: "체크인은 이 QR코드로 진행해 주세요",
  zh: "请通过此二维码办理入住",
},
{
  icon: "🛎️",
  jp: "スタッフ呼び出しはこちら",
  tags: ["スタッフ", "呼び出し", "呼ぶ"],
  en: "Call Staff Here",
  ko: "직원 호출은 여기에서 해 주세요",
  zh: "请在此呼叫工作人员",
},
{
  icon: "🚭",
  jp: "禁煙",
  tags: ["禁煙", "タバコ", "たばこ", "喫煙"],
  en: "No Smoking",
  ko: "금연",
  zh: "禁止吸烟",
},
{
  icon: "🚭",
  jp: "電子タバコ禁止",
  tags: ["電子タバコ", "加熱式タバコ", "vape"],
  en: "No E-Cigarettes",
  ko: "전자담배 사용 금지",
  zh: "禁止使用电子烟",
},
{
  icon: "🚭",
  jp: "路上喫煙禁止",
  tags: ["路上喫煙", "外", "タバコ", "喫煙"],
  en: "No Smoking on the Street",
  ko: "노상 흡연 금지",
  zh: "禁止路边吸烟",
},
{
  icon: "🚬",
  jp: "喫煙所はこちら",
  tags: ["喫煙所", "喫煙", "タバコ"],
  en: "Smoking Area This Way",
  ko: "흡연 구역은 이쪽입니다",
  zh: "吸烟区在这边",
},
{
  icon: "📷",
  jp: "撮影禁止",
  tags: ["撮影", "写真", "カメラ", "動画"],
  en: "No Photography",
  ko: "촬영 금지",
  zh: "禁止拍照",
},
{
  icon: "📵",
  jp: "通話禁止",
  tags: ["通話", "電話", "携帯電話"],
  en: "No Phone Calls",
  ko: "통화 금지",
  zh: "禁止通话",
},
{
  icon: "🔇",
  jp: "お静かにお願いします",
  tags: ["静か", "騒がない", "大声"],
  en: "Please Keep Quiet",
  ko: "조용히 이용해 주세요",
  zh: "请保持安静",
},
{
  icon: "🐾",
  jp: "ペット同伴禁止",
  tags: ["ペット", "犬", "猫", "動物"],
  en: "No Pets Allowed",
  ko: "반려동물 동반 금지",
  zh: "禁止携带宠物",
},
{
  icon: "🚗",
  jp: "無断駐車禁止",
  tags: ["駐車", "車", "無断"],
  en: "No Unauthorized Parking",
  ko: "무단 주차 금지",
  zh: "禁止擅自停车",
},
{
  icon: "⛔",
  jp: "立入禁止",
  tags: ["立入禁止", "入れない", "禁止"],
  en: "No Entry",
  ko: "출입 금지",
  zh: "禁止入内",
},
{
  icon: "🙏",
  jp: "ご協力ありがとうございます",
  tags: ["ありがとう", "協力", "感謝"],
  en: "Thank You for Your Cooperation",
  ko: "협조해 주셔서 감사합니다",
  zh: "感谢您的配合",
},
{
  icon: "👥",
  jp: "お並びのお客様を優先します",
  tags: ["並ぶ", "優先", "列"],
  en: "Priority Given to Customers in Line",
  ko: "줄 서 계신 고객님을 우선 안내해 드립니다",
  zh: "优先为排队顾客提供服务",
},
{
  icon: "🪑",
  jp: "お席のみの確保はご遠慮ください",
  tags: ["席取り", "場所取り", "席"],
  en: "Please Do Not Reserve Seats Only",
  ko: "자리만 맡아두는 행위는 삼가 주세요",
  zh: "请勿只占座不就座",
},
{
  icon: "🤝",
  jp: "周囲のお客様へのご配慮をお願いします",
  tags: ["配慮", "マナー", "周囲"],
  en: "Please Be Considerate of Other Guests",
  ko: "주변 고객분들을 배려해 주세요",
  zh: "请照顾周围顾客",
},
{
  icon: "🗣️",
  jp: "大声での会話はご遠慮ください",
  tags: ["大声", "会話", "騒音"],
  en: "Please Refrain from Loud Conversations",
  ko: "큰 소리로 대화하는 것은 삼가 주세요",
  zh: "请勿大声交谈",
},
{
  icon: "👶",
  jp: "お子様から目を離さないでください",
  tags: ["子ども", "注意", "見守り"],
  en: "Please Keep an Eye on Your Children",
  ko: "어린이에게서 눈을 떼지 말아 주세요",
  zh: "请勿让孩子离开您的视线",
},
{
  icon: "👣",
  jp: "足元にご注意ください",
  tags: ["足元", "段差", "注意"],
  en: "Watch Your Step",
  ko: "발밑을 주의해 주세요",
  zh: "请注意脚下",
},
{
  icon: "⚠️",
  jp: "滑りやすくなっています",
  tags: ["滑る", "床", "注意"],
  en: "Caution: Slippery Floor",
  ko: "미끄러우니 주의해 주세요",
  zh: "小心地滑",
},
{
  icon: "✋",
  jp: "お手を触れないでください",
  tags: ["触る", "さわる", "禁止"],
  en: "Please Do Not Touch",
  ko: "손대지 말아 주세요",
  zh: "请勿触摸",
},
{
  icon: "👨‍💼",
  jp: "スタッフの案内に従ってください",
  tags: ["スタッフ", "案内", "従う"],
  en: "Please Follow Staff Instructions",
  ko: "직원의 안내에 따라 주세요",
  zh: "请遵从工作人员指引",
},
{
  icon: "📸",
  jp: "写真撮影スポット",
  tags: ["写真", "撮影", "スポット"],
  en: "Photo Spot",
  ko: "포토존",
  zh: "拍照区",
},
{
  icon: "➡️",
  jp: "一方通行",
  tags: ["一方通行", "片道", "通路"],
  en: "One Way",
  ko: "일방통행",
  zh: "单向通行",
},
{
  icon: "🚲",
  jp: "駐輪禁止",
  tags: ["自転車", "駐輪", "禁止"],
  en: "No Bicycle Parking",
  ko: "자전거 주차 금지",
  zh: "禁止停放自行车",
},
{
  icon: "🅿️",
  jp: "駐車場はこちら",
  tags: ["駐車場", "車", "parking"],
  en: "Parking This Way",
  ko: "주차장은 이쪽입니다",
  zh: "停车场在这边",
},
{
  icon: "⛔",
  jp: "関係者以外立入禁止",
  tags: ["関係者", "立入禁止", "staff only"],
  en: "Staff Only",
  ko: "관계자 외 출입 금지",
  zh: "非工作人员禁止入内",
},
{
  icon: "👥",
  jp: "こちらにお並びください",
  tags: ["並ぶ", "列", "順番"],
  en: "Please Line Up Here",
  ko: "이곳에 줄 서 주세요",
  zh: "请在此排队",
},
{
  icon: "🛗",
  jp: "エレベーターはこちら",
  tags: ["エレベーター", "昇降機"],
  en: "Elevator This Way",
  ko: "엘리베이터는 이쪽입니다",
  zh: "电梯在这边",
},
{
  icon: "🎟️",
  jp: "クーポン取得はこちらのQRコードから",
  tags: ["クーポン", "QR", "割引"],
  en: "Get Your Coupon Using This QR Code",
  ko: "쿠폰은 이 QR코드로 받아 주세요",
  zh: "请通过此二维码领取优惠券",
},
{
  icon: "🗑️",
  jp: "ゴミはお持ち帰りください",
  tags: ["ゴミ", "持ち帰り", "捨てる"],
  en: "Please Take Your Trash with You",
  ko: "쓰레기는 가져가 주세요",
  zh: "请将垃圾自行带走",
},
{
  icon: "♻️",
  jp: "ゴミの分別にご協力ください",
  tags: ["ゴミ", "分別", "リサイクル"],
  en: "Please Sort Your Trash",
  ko: "쓰레기 분리배출에 협조해 주세요",
  zh: "请配合垃圾分类",
},
{
  icon: "🗑️",
  jp: "指定の場所へお捨てください",
  tags: ["ゴミ", "捨てる", "指定場所"],
  en: "Please Dispose of Trash in the Designated Area",
  ko: "지정된 장소에 버려 주세요",
  zh: "请将垃圾丢弃到指定区域",
},
{
  icon: "🚯",
  jp: "ポイ捨て禁止",
  tags: ["ポイ捨て", "ごみ", "禁止"],
  en: "No Littering",
  ko: "쓰레기 무단투기 금지",
  zh: "禁止乱扔垃圾",
},
{
  icon: "🔌",
  jp: "充電はご遠慮ください",
  tags: ["充電", "コンセント", "電源", "携帯電話"],
  en: "Please Refrain from Charging Devices Here",
  ko: "이곳에서의 충전은 삼가 주세요",
  zh: "请勿在此充电",
},
{
  icon: "📶",
  jp: "Wi-Fi利用可",
  tags: ["Wi-Fi", "wifi", "ネット"],
  en: "Wi-Fi Available",
  ko: "Wi-Fi 이용 가능합니다",
  zh: "可使用 Wi-Fi",
},
{
  icon: "🔑",
  jp: "パスワードはスタッフへお尋ねください",
  tags: ["Wi-Fi", "パスワード", "スタッフ"],
  en: "Please Ask Staff for the Password",
  ko: "비밀번호는 직원에게 문의해 주세요",
  zh: "密码请向工作人员咨询",
},
{
  icon: "🎒",
  jp: "忘れ物にご注意ください",
  tags: ["忘れ物", "荷物", "注意"],
  en: "Please Check for Your Belongings",
  ko: "소지품을 다시 한번 확인해 주세요",
  zh: "请确认不要遗忘随身物品",
},
{
  icon: "🧳",
  jp: "荷物から目を離さないでください",
  tags: ["荷物", "盗難", "注意"],
  en: "Please Keep an Eye on Your Belongings",
  ko: "소지품에서 눈을 떼지 말아 주세요",
  zh: "请勿让您的随身物品离开视线",
},
{
  icon: "📲",
  jp: "SNSフォローはこちらのQRコードから",
  tags: ["SNS", "フォロー", "QR"],
  en: "Follow Us Using This QR Code",
  ko: "SNS 팔로우는 이 QR코드로 부탁드립니다",
  zh: "请通过此二维码关注我们的社交账号",
},
{
  icon: "📱",
  jp: "ご注文はこちらのQRコードから",
  tags: ["注文", "QR", "オーダー"],
  en: "Order Using This QR Code",
  ko: "주문은 이 QR코드로 진행해 주세요",
  zh: "请通过此二维码点单",
},
{
  icon: "📖",
  jp: "メニューはこちらのQRコードから",
  tags: ["メニュー", "QR", "見る"],
  en: "View the Menu Using This QR Code",
  ko: "메뉴는 이 QR코드로 확인해 주세요",
  zh: "请通过此二维码查看菜单",
},
{
  icon: "📝",
  jp: "アンケートはこちらのQRコードから",
  tags: ["アンケート", "QR", "回答"],
  en: "Please Complete Our Survey Using This QR Code",
  ko: "설문조사는 이 QR코드로 참여해 주세요",
  zh: "请通过此二维码参与问卷调查",
},
{
  icon: "⭐",
  jp: "予約優先",
  tags: ["予約", "優先", "予約客"],
  en: "Reservations Have Priority",
  ko: "예약 고객 우선",
  zh: "预约顾客优先",
},
{
  icon: "📅",
  jp: "予約はこちら",
  tags: ["予約", "受付", "book"],
  en: "Make a Reservation Here",
  ko: "예약은 여기에서 해 주세요",
  zh: "请在此预约",
},
{
  icon: "🙋",
  jp: "ご不明な点はスタッフへお声がけください",
  tags: ["質問", "スタッフ", "案内"],
  en: "Please Ask Staff If You Need Assistance",
  ko: "궁금하신 점은 직원에게 말씀해 주세요",
  zh: "如有疑问，请咨询工作人员",
},
{
  icon: "🚽",
  jp: "水を流す",
  tags: ["流す", "トイレ", "flush"],
  en: "Flush",
  ko: "물 내리기",
  zh: "冲水",
},
{
  icon: "🚫",
  jp: "使用禁止",
  tags: ["禁止", "使用不可", "使えない"],
  en: "Do Not Use",
  ko: "사용 금지",
  zh: "禁止使用",
},
{
  icon: "⭕",
  jp: "ご利用いただけます",
  tags: ["利用可", "使える", "available"],
  en: "Available for Use",
  ko: "이용 가능합니다",
  zh: "可以使用",
},
{
  icon: "🛠️",
  jp: "準備中",
  tags: ["準備中", "利用不可", "close"],
  en: "Temporarily Unavailable",
  ko: "준비 중입니다",
  zh: "准备中",
},

];

function CopyIcon() {
  return (
    <svg
      className="h-7 w-7 text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <rect x="4" y="4" width="11" height="11" rx="2" />
    </svg>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState<(typeof phrases)[0] | null>(null);
  const [copied, setCopied] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showPremium, setShowPremium] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [prevView, setPrevView] = useState<"home" | "category" | "search">("home");

  const feedbackFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScbF2SA6P6Gd_p1yMXy0xtinmC8LrwdN5Rvk9IOJ4z-85joBA/viewform?usp=header";

  const categoryMap: Record<string, string[]> = {
    QRコード: ["QR"],
    禁止事項: ["禁止", "撮影", "立入", "ポイ捨て"],
    温泉: ["温泉", "入浴", "タトゥー"],
    支払い: ["現金", "カード", "電子決済", "支払い"],
    タバコ: ["禁煙", "喫煙", "タバコ", "電子タバコ"],
    注文: ["注文", "メニュー", "予約"],
    トイレ: ["トイレ", "流す", "生理用品"],
    携帯電話: ["携帯電話", "スマホ", "通話", "充電"],
  };

  const categoryCounts: Record<string, number> = Object.fromEntries(
  Object.keys(categoryMap).map((cat) => [
    cat,
    phrases.filter((item) =>
      categoryMap[cat].some((keyword) =>
        [item.jp, ...item.tags].some((word) => word.includes(keyword))
      )
    ).length,
  ])
);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    const savedHistory = localStorage.getItem("history");
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const results =
    selectedCategory && selectedCategory !== "一覧"
      ? phrases.filter((item) =>
          categoryMap[selectedCategory]?.some((keyword) =>
            [item.jp, ...item.tags].some((word) => word.includes(keyword))
          )
        )
      : query.trim() === ""
        ? []
        : phrases.filter((item) =>
            [item.jp, ...item.tags].some((word) =>
              word.toLowerCase().includes(query.trim().toLowerCase())
            )
          );

  const handleSearch = () => {
    setPrevView("search");
    setShowFavorites(false);
    setSearched(true);
    setSelected(results.length === 1 ? results[0] : null);
  };

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const showPhrase = selected || (results.length === 1 ? results[0] : null);

  useEffect(() => {
    if (!showPhrase) return;

    setHistory((prev) => {
      const newHistory = [
        showPhrase.jp,
        ...prev.filter((h) => h !== showPhrase.jp),
      ];
      return newHistory.slice(0, 5);
    });
  }, [showPhrase]);

  const toggleFavorite = (jp: string) => {
    setFavorites((prev) =>
      prev.includes(jp)
        ? prev.filter((item) => item !== jp)
        : [...prev, jp]
    );
  };

  const resetHome = () => {
    setQuery("");
    setSearched(false);
    setSelected(null);
    setSelectedCategory("");
    setShowFavorites(false);
    setSearchFocused(false);
    setPrevView("home");
  };

  const languages = showPhrase
    ? [
        {
          flag: "https://flagcdn.com/w80/us.png",
          name: "English",
          text: showPhrase.en,
        },
        {
          flag: "https://flagcdn.com/w80/kr.png",
          name: "한국어",
          text: showPhrase.ko,
        },
        {
          flag: "https://flagcdn.com/w80/cn.png",
          name: "中文（简体）",
          text: showPhrase.zh,
        },
      ]
    : [];

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-slate-900 text-slate-900" : "bg-slate-50 text-slate-900"
      }`}
    >
      <header className="bg-blue-600 text-white shadow-sm">
        <div className="flex h-20 items-center justify-between px-8">
          <button onClick={resetHome}>
            <img src="/logo.png" alt="ことぺた" className="h-40 w-auto" />
          </button>

          <nav className="flex gap-10 text-center text-sm font-bold">
            <button
              onClick={() => {
                setShowFavorites(true);
                setMenuOpen(false);
                setSelectedCategory("");
                setSelected(null);
                setSearched(false);
              }}
              className="flex flex-col items-center leading-tight"
            >
              <span className="text-3xl">♡</span>
              <span>お気に入り</span>
            </button>
<button
  onClick={() => {
    setShowPremium(true);
    setShowFavorites(false);
    setSelected(null);
    setSearched(false);
    setMenuOpen(false);
  }}
  className="flex flex-col items-center leading-tight"
>
  <span className="text-3xl">👑</span>
  <span>プレミアム</span>
</button>

            <button
              onClick={() => {
                setMenuOpen(true);
                setSelectedCategory("");
              }}
              className="flex flex-col items-center leading-tight"
            >
              <span className="text-3xl">☰</span>
              <span>メニュー</span>
            </button>
          </nav>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="flex-1 bg-black/10"
              onClick={() => setMenuOpen(false)}
            />

            <div className="h-full w-80 bg-blue-600 text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/20 px-6 py-5">
                <span className="text-lg font-bold">メニュー</span>
                <button onClick={() => setMenuOpen(false)} className="text-2xl">
                  ×
                </button>
              </div>

              {selectedCategory !== "一覧" ? (
                <>
                  <button
                    onClick={() => setSelectedCategory("一覧")}
                    className="flex w-full items-center justify-between border-b border-white/20 px-6 py-6 text-left text-lg font-bold"
                  >
                    <span>カテゴリーで探す</span>
                    <span>〉</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowFavorites(true);
                      setMenuOpen(false);
                      setSelectedCategory("");
                      setSelected(null);
                      setSearched(false);
                    }}
                    className="flex w-full items-center justify-between border-b border-white/20 px-6 py-6 text-left text-lg font-bold"
                  >
                    <span>♡ お気に入り</span>
                    <span>〉</span>
                  </button>

                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex w-full items-center justify-between border-b border-white/20 px-6 py-6 text-left text-lg font-bold"
                  >
                    <span>☾ ダークモード</span>
                    <span>{darkMode ? "ON" : "OFF"}</span>
                  </button>

                  <button className="flex w-full items-center justify-between border-b border-white/20 px-6 py-6 text-left text-lg font-bold">
                    <span>👑 プレミアム</span>
                    <span>〉</span>
                  </button>

                  <button
                    onClick={() => window.open(feedbackFormUrl, "_blank")}
                    className="flex w-full items-center justify-between px-6 py-6 text-left text-lg font-bold"
                  >
                    <span>✉ ご意見・ご要望</span>
                    <span>〉</span>
                  </button>
                </>
              ) : (
                <>
                  {[
                    "QRコード",
                    "禁止事項",
                    "温泉",
                    "支払い",
                    "タバコ",
                    "注文",
                    "トイレ",
                    "携帯電話",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setPrevView("category");
                        setSelectedCategory(cat);
                        setSearched(true);
                        setSelected(null);
                        setQuery("");
                        setMenuOpen(false);
                        setShowFavorites(false);
                      }}
                      className="block w-full border-b border-white/20 px-6 py-5 text-left text-lg font-bold"
                    >
                    <span
  className={
    categoryCounts[cat] === 0
      ? "opacity-40"
      : ""
  }
>
  {cat}（{categoryCounts[cat]}）
</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-16 text-center">
        <h1
          className={`text-4xl font-black tracking-tight md:text-5xl ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          正しい外国語を、簡単に。
        </h1>

        <p
          className={`mt-4 text-lg font-semibold ${
            darkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          日本語のキーワードから、外国語を探せます。
        </p>

        {!showFavorites && (
          <>
            <div ref={searchRef} className="relative mx-auto mt-10 max-w-4xl">
              <div className="flex items-center gap-4 rounded-full border-2 border-blue-600 bg-white p-3 shadow-sm">
                <span className="pl-5 text-3xl">⌕</span>

                <input
                  value={query}
                  onFocus={() => setSearchFocused(true)}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSearched(false);
                    setSelected(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="flex-1 bg-transparent text-xl outline-none"
                  placeholder="例）タバコ、トイレ、現金のみ など"
                />

                <button
                  onClick={handleSearch}
                  className="rounded-full bg-blue-600 px-9 py-4 text-lg font-bold text-white"
                >
                  検索
                </button>
              </div>

              {searchFocused && history.length > 0 && query === "" && (
                <div className="absolute left-0 right-0 top-full z-40 mt-3 rounded-3xl bg-white p-4 text-left shadow-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-500">
                      最近使った
                    </p>

                    <button
                      onClick={() => setHistory([])}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      クリア
                    </button>
                  </div>

                  <div className="space-y-2">
                    {history.map((h) => {
                      const item = phrases.find((p) => p.jp === h);
                      if (!item) return null;

                      return (
                        <button
                          key={item.jp}
                          onClick={() => {
                            setSelected(item);
                            setSearched(true);
                            setQuery("");
                            setSearchFocused(false);
                            setPrevView("search");
                          }}
                          className="flex w-full items-center justify-between rounded-2xl px-4 py-3 font-bold text-slate-800 hover:bg-blue-50"
                        >
                          <span>
                            {item.icon} {item.jp}
                          </span>
                          <span>〉</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <span
                className={`flex items-center gap-2 font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                <span className="text-2xl">🔥</span>
                <span>人気ワード</span>
              </span>

              {popularWords.map((word) => (
                <button
                  key={word.label}
                  onClick={() => {
                    setPrevView("search");
                    setQuery(word.label);
                    setSearched(true);
                    setShowFavorites(false);

                    const matched = phrases.filter((item) =>
                      [item.jp, ...item.tags].some((tag) =>
                        tag.toLowerCase().includes(word.label.toLowerCase())
                      )
                    );

                    setSelected(matched.length === 1 ? matched[0] : null);
                  }}
                  className="flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 font-bold text-slate-900 shadow-sm"
                >
                  <span className="text-xl">{word.icon}</span>
                  <span>{word.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="mx-auto mt-14 max-w-4xl px-6">
         {showPremium && (
    <div className="rounded-3xl bg-blue-50 border border-blue-100 p-8 shadow-sm text-center">

      <h2 className="text-3xl font-black text-slate-900">👑 プレミアム</h2>

      <p className="mt-3 text-slate-600 font-semibold">
        今後追加予定の機能です
      </p>
<div className="mt-8 grid grid-cols-3 gap-5 text-left">
  <div className="rounded-2xl bg-white p-5 shadow-sm">
    <p className="text-xl">♡</p>
    <p className="mt-2 font-black text-slate-900">お気に入り無制限保存</p>
  </div>

  <div className="rounded-2xl bg-white p-5 shadow-sm">
    <p className="text-xl">📄</p>
    <p className="mt-2 font-black text-slate-900">PDFでダウンロード</p>
  </div>

  <div className="rounded-2xl bg-white p-5 shadow-sm">
    <p className="text-xl">🚫</p>
    <p className="mt-2 font-black text-slate-900">広告なし</p>
  </div>
</div>

      <button
        onClick={() => setShowPremium(false)}
       className="mt-6 rounded-full bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700"
      >
        ← 戻る
      </button>

    </div>
  )}

 {showFavorites && (
  <div className="rounded-3xl bg-blue-600 p-7 text-white shadow-sm">
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-2xl font-black text-white">
        ♡ お気に入り
      </h2>

      <button
        onClick={() => setShowFavorites(false)}
        className="rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50"
      >
        ← 戻る
      </button>
    </div>

    {favorites.length === 0 ? (
      <p className="mt-5 text-blue-100">
        まだお気に入りはありません。
      </p>
    ) : (
      <div className="mt-5 space-y-3">
        {favorites.map((fav) => {
          const item = phrases.find((p) => p.jp === fav);
          if (!item) return null;

          return (
            <div
              key={item.jp}
              className="flex w-full items-center justify-between rounded-2xl bg-blue-50 px-5 py-4 font-bold text-blue-700 transition hover:bg-blue-100"
            >
              <button
                onClick={() => {
                  setSelected(item);
                  setShowFavorites(false);
                  setSearched(true);
                  setPrevView("search");
                }}
                className="flex flex-1 items-center justify-between text-left"
              >
                <span>
                  {item.icon} {item.jp}
                </span>

                <span>〉</span>
              </button>

              <span
  onClick={(e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.filter((f) => f !== item.jp)
    );
  }}
  className="ml-4 cursor-pointer rounded-full px-2 text-sm text-red-400 hover:text-red-600"
  role="button"
  aria-label={`${item.jp}をお気に入りから削除`}
>
  ×
</span>
            </div>
          );
        })}
      </div>
    )}
  </div>
)}

        {searched && results.length > 1 && !selected && !showFavorites && (
          <>
            {selectedCategory && selectedCategory !== "一覧" && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-left text-xl font-black text-blue-600">
                  カテゴリー：{selectedCategory}
                </p>

                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSearched(false);
                    setSelected(null);
                  }}
                  className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50"
                >
                  ← 戻る
                </button>
              </div>
            )}

            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <h2 className="text-xl font-black text-slate-800">
                候補が見つかりました
              </h2>

              <div className="mt-5 space-y-3">
                {results.map((item) => (
                  <button
                    key={item.jp}
                    onClick={() => setSelected(item)}
                    className="flex w-full items-center justify-between rounded-2xl bg-blue-50 px-5 py-4 text-left font-bold text-blue-700 transition hover:bg-blue-100"
                  >
                    <span>
                      {item.icon} {item.jp}
                    </span>
                    <span>〉</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {searched && results.length === 0 && !selected && !showFavorites && (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <p className="text-2xl font-black text-slate-800">
              この言葉は、まだ準備中です。
            </p>
            <p className="mt-3 font-semibold text-slate-500">
              ことぺたは少しずつ言葉を増やしています。
            </p>
          </div>
        )}

        {searched && showPhrase && !showFavorites && (
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <button
              onClick={() => {
                setSelected(null);
                setQuery("");

                if (prevView === "category") {
                  setSearched(true);
                } else {
                  setSearched(false);
                  setSelectedCategory("");
                }
              }}
              className="sticky top-4 z-40 mb-6 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow hover:bg-blue-50"
            >
              ← 戻る
            </button>

            <div className="text-center">
              <p className="text-5xl">{showPhrase.icon}</p>
              <h2 className="mt-3 text-4xl font-black">{showPhrase.jp}</h2>
            </div>

            <div className="mt-8 space-y-4">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center gap-4 rounded-2xl bg-blue-50 px-6 py-5"
                >
                  <div className="flex-1">
                    <p className="flex items-center gap-3 text-base font-bold text-blue-700">
                      <img
                        src={lang.flag}
                        alt={lang.name}
                        className={`h-7 w-7 rounded-full object-cover shadow-sm ${
                          lang.name === "中文（简体）"
                            ? "object-left"
                            : "object-center"
                        }`}
                      />
                      <span>{lang.name}</span>
                    </p>

                    <p className="mt-2 text-2xl font-black">{lang.text}</p>
                  </div>

                  <button
                    onClick={() => copyText(lang.text)}
                    className="rounded-full p-2 transition hover:bg-blue-100"
                    aria-label={`${lang.name}をコピー`}
                  >
                    <CopyIcon />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => toggleFavorite(showPhrase.jp)}
              className={`mx-auto mt-7 flex items-center gap-2 rounded-full border px-6 py-3 font-bold transition-all duration-200 active:scale-95 ${
                favorites.includes(showPhrase.jp)
                  ? "scale-105 border-blue-600 bg-blue-600 text-white shadow-md"
                  : "scale-100 border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
              }`}
            >
              <span className="text-2xl">♡</span>
              <span>
                {favorites.includes(showPhrase.jp)
                  ? "お気に入り済み"
                  : "お気に入りに保存"}
              </span>
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto mt-24 max-w-5xl px-6 pb-12">
        <div className="rounded-3xl border border-blue-100 bg-blue-50 px-8 py-7 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-left">
              <p className="flex items-center gap-2 text-xl font-black text-blue-700">
                <span className="text-2xl">👑</span>
                <span>プレミアム会員でもっと便利に</span>
              </p>
              <p className="mt-2 text-sm font-medium text-slate-600">
                PDF保存・お気に入り保存・広告非表示など、さらに快適に使えます。
              </p>
            </div>

           <button
  onClick={() => {
    setShowPremium(true);
    setShowFavorites(false);
    setSelected(null);
    setSearched(false);
    setMenuOpen(false);
  }}
  className="rounded-full bg-blue-600 px-7 py-3 font-bold text-white shadow-sm hover:bg-blue-700"
>
  詳しく見る →
</button>
          </div>
        </div>
      </section>

      {copied && (
        <div className="fixed right-6 top-24 z-50 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg">
          ✅ コピーしました
        </div>
      )}
    </main>
  );
}