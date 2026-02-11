
const fs = require('fs');
const path = require('path');

const platforms = [
  {
    id: "medtools.id",
    handle: "@medtools.id",
    filename: "SOP-Panduan-Creator-Medtools.id.md",
    short_description: "Hub utama brand awareness dan engagement ekosistem Medtools.",
    social_embeds: [
      { type: "instagram", url: "https://www.instagram.com/medtools.id/" },
      { type: "tiktok", url: "https://www.tiktok.com/@medtools.id" }
    ],
    kpi: true
  },
  {
    id: "medtools.store",
    handle: "@medtools.store",
    filename: "SOP-Panduan-Creator-Medtools.Store.md",
    short_description: "Platform e-commerce dan product showcase alat kedokteran.",
    social_embeds: [
      { type: "instagram", url: "https://www.instagram.com/medtools.store/" }
    ],
    kpi: true
  },
  {
    id: "medtools.academy",
    handle: "@medtools.academy",
    filename: "SOP-Panduan-Creator-Medtools.Academy.md",
    short_description: "Pusat edukasi dan kelas bimbingan mahasiswa kedokteran.",
    social_embeds: [
      { type: "instagram", url: "https://www.instagram.com/medtools.academy/" }
    ],
    kpi: true
  },
  {
    id: "hai.medi",
    handle: "@hai.medi",
    filename: "SOP-Panduan-Creator-Hai-Medi.md",
    short_description: "Persona virtual assistant dan teman belajar mahasiswa.",
    social_embeds: [
      { type: "instagram", url: "https://www.instagram.com/hai.medi/" }
    ],
    kpi: true
  },
  {
    id: "medimpact.co",
    handle: "@medimpact.co",
    filename: "SOP-Panduan-Creator-Medimpact.co.md",
    short_description: "Platform social impact dan kolaborasi eksternal.",
    social_embeds: [
      { type: "instagram", url: "https://www.instagram.com/medimpact.co/" }
    ],
    kpi: true
  }
];

const sourceDir = path.join(__dirname, '../../'); // Root downloads
const destDir = path.join(__dirname, '../content');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

platforms.forEach(p => {
  const srcPath = path.join(sourceDir, p.filename);
  const destPath = path.join(destDir, p.filename);

  if (fs.existsSync(srcPath)) {
    let content = fs.readFileSync(srcPath, 'utf-8');
    
    // Check if frontmatter already exists
    if (!content.trim().startsWith('---')) {
      const frontmatter = `---
title: "SOP Panduan Creator – Platform ${p.handle}"
id: "${p.id}"
platform_handle: "${p.handle}"
short_description: "${p.short_description}"
hero_image: "/assets/hero-${p.id.replace('.','-')}.jpg"
kpi: ${p.kpi}
social_embeds:
${p.social_embeds.map(s => `  - type: ${s.type}\n    url: "${s.url}"`).join('\n')}
toc: true
draft: false
---

`;
      content = frontmatter + content;
      console.log(`Adding frontmatter to ${p.filename}`);
    } else {
        console.log(`Frontmatter already exists for ${p.filename}, skipping injection.`);
    }

    fs.writeFileSync(destPath, content);
    console.log(`Wrote to ${destPath}`);
  } else {
    console.error(`Source file not found: ${srcPath}`);
  }
});
