import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ngifzwmupsztjxhgttqb.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: existing, error: selErr } = await supabase.from('posts').select('id');
  console.log('Existing posts count in DB:', existing?.length, selErr || '');

  if (!existing || existing.length === 0) {
    console.log('Seeding initial authentic stories into posts table...');
    const { data, error } = await supabase.from('posts').insert([
      {
        title: 'अंबाजोगाईची ज्ञानसाधना: आद्यकवी मुकुंदराज व संत दासोपंतांचा समृद्ध वारसा',
        slug: 'ambajogai-literary-heritage-mukundraj-dasopant',
        category: 'blog',
        status: 'published',
        language: 'mr',
        excerpt: 'अंबाजोगाई ही मराठी साहित्याची पावन जन्मभूमी मानली जाते. याच मातीत आद्यकवी मुकुंदराज यांनी मराठीतील पहिला ग्रंथ विवेकसिंधू लिहिला.\nसंत दासोपंतांच्या पदस्पर्शाने पुनीत झालेल्या या साहित्यनगरीत ग्रंथ चळवळ कशी बहरली याचा हा विशेष मागोवा...',
        content: `अंबाजोगाई ही मराठी भाषेची आणि साहित्याची अधिकृत जन्मभूमी मानली जाते. इसवी सनाच्या १२ व्या शतकात आद्यकवी मुकुंदराज यांनी याच पावन भूमीत मराठीतील पहिला तत्त्वज्ञानपर ग्रंथ 'विवेकसिंधू' लिहिला आणि मराठीला ज्ञानभाषेचा अद्वितीय दर्जा मिळवून दिला.

त्यानंतर संत दासोपंतांनी अखंड साहित्यसाधना करून सव्वा लाख पदांची रचना केली. त्यांची 'पासोडी' ही वस्त्रग्रंथ निर्मिती जगभरातील संशोधकांसाठी आजही अभ्यासाचा विषय आहे.

याच महान परंपरेचे जतन आणि संवर्धन करण्याचे पवित्र कार्य साहित्य निकेतन ग्रंथालय गेल्या ८०+ वर्षांपासून अविरतपणे करत आहे. ग्रंथालयात उपलब्ध असलेले प्राचीन संदर्भग्रंथ, मोडी लिपीतील ऐतिहासिक कागदपत्रे आणि मराठी साहित्याचा खजिना नव्या पिढीला प्रेरणा देत आहे.

वाचन संस्कृती ही समाजाची वैचारिक ताकद असते. साहित्य निकेतन ग्रंथालयाचे मुक्तद्वार दालन, स्पर्धा परीक्षा अभ्यासिका आणि बाल वाचन कट्टा या त्रिसूत्रीतून ही संस्कृती सातत्याने वृद्धिंगत होत आहे.`,
        thumbnail_url: '/images/real/library_vintage_books.png',
        published_at: new Date().toISOString(),
        views: 142
      },
      {
        title: 'वाचन संस्कृतीची ८०+ वर्षे: १ ऑगस्ट १९४५ पासूनचा गौरवशाली प्रवास',
        slug: '80-years-of-sahitya-niketan-ambajogai',
        category: 'news',
        status: 'published',
        language: 'mr',
        excerpt: '१ ऑगस्ट १९४५ रोजी स्थापन झालेले साहित्य निकेतन ग्रंथालय आज मराठवाड्यातील अग्रगण्य सार्वजनिक वाचनालय ठरले आहे.\n३९,९५३ ग्रंथांचा अमूल्य संग्रह आणि स्पर्धा परीक्षा अभ्यासिकेच्या माध्यमातून हजारो युवकांना घडविणारे हे ज्ञानतीर्थ.\nवाचक, सभासद आणि साहित्यप्रेमींच्या सहकार्याने सुरू असलेल्या या वाटचालीचा रंजक इतिहास...',
        content: `१ ऑगस्ट १९४५ रोजी अंबाजोगाईच्या मध्यवस्तीतील भाजी मंडई परिसरात सुरू झालेले साहित्य निकेतन ग्रंथालय आज महाराष्ट्र शासनाचे वर्ग 'अ' दर्जाचे सार्वजनिक ग्रंथालय म्हणून दिमाखात उभे आहे.

गेल्या आठ दशकांहून अधिक काळात या ग्रंथालयाने हजारो विद्यार्थ्यांना स्पर्धा परीक्षांच्या माध्यमातून अधिकारी, प्राध्यापक व लेखक बनवले आहे. वातानुकूलित अभ्यासिका, दैनिक वर्तमानपत्र दालन आणि महिला-बालकांसाठीचे स्वतंत्र दालन यामुळे हे ग्रंथालय सर्वांचे हक्काचे माहेरघर बनले आहे.

ग्रंथालयाच्या स्थापनेपासून ते आजच्या डिजिटल युगापर्यंतचा हा प्रवास केवळ पुस्तकांचा नसून, अंबाजोगाईच्या वैचारिक जडणघडणीचा इतिहास आहे.`,
        thumbnail_url: '/images/real/library_cupboards.png',
        published_at: new Date().toISOString(),
        views: 285
      }
    ]);
    console.log('Seed result:', data, error);
  } else {
    console.log('Posts already exist in DB, skipping seed.');
  }
}

main().catch(console.error);
