
import { getAllPlatformIds, getPlatformData } from '../lib/api';

async function verifyContent() {
    console.log("Verifying content...");
    const platforms = getAllPlatformIds();
    console.log("Found platforms:", platforms);

    for (const p of platforms) {
        console.log(`Processing ${p.slug}...`);
        try {
            const data = await getPlatformData(p.slug);
            if (!data) {
                console.error(`FAILED: ${p.slug} returned null data`);
            } else {
                console.log(`SUCCESS: ${p.slug} - Title: ${data.title}`);
            }
        } catch (e) {
            console.error(`CRASH: ${p.slug}`, e);
        }
    }
}

verifyContent();
