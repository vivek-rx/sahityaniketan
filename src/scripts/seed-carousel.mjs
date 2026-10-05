import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ngifzwmupsztjxhgttqb.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: existing, error: selErr } = await supabase.from('carousel_slides').select('*');
  console.log('Existing carousel slides in DB:', existing?.length, selErr || '');

  if (!existing || existing.length === 0) {
    console.log('Inserting default slides into Supabase carousel_slides table...');
    const { data, error } = await supabase.from('carousel_slides').insert([
      {
        title: 'साहित्य निकेतन ग्रंथालय अधिकृत फलक व वास्तू',
        subtitle: 'अंबाजोगाई येथील ऐतिहासिक साहित्य निकेतन ग्रंथालयाची मुख्य वास्तू व अधिकृत नामफलक.',
        image_url: '/images/real/library_signboard.png',
        button_text: 'माहिती पहा',
        button_link: '/about',
        is_active: true,
        display_order: 1
      },
      {
        title: 'साहित्य निकेतन मुख्य ग्रंथदालन व कपाटे',
        subtitle: 'ग्रंथांनी समृद्ध असलेले मुख्य ग्रंथदालन आणि वाचन कपाटे.',
        image_url: '/images/real/library_cupboards.png',
        button_text: 'ग्रंथ संग्रह',
        button_link: '/catalogue',
        is_active: true,
        display_order: 2
      },
      {
        title: 'साहित्य निकेतन व्याख्यानमाला व सांस्कृतिक माहितीपट',
        subtitle: 'अंबाजोगाईच्या सांस्कृतिक व साहित्यिक वैभवावर आधारित विशेष व्याख्यानमाला व ध्वनी-चित्रफित.',
        image_url: 'https://img.youtube.com/vi/vB39xHj_Rmg/hqdefault.jpg',
        button_text: 'व्हिडिओ माहितीपट (Video Highlight)',
        button_link: 'https://www.youtube.com/watch?v=vB39xHj_Rmg',
        is_active: true,
        display_order: 3
      }
    ]);
    console.log('Insert result:', data, error);
  }
}

main().catch(console.error);
