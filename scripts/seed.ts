const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "ארוחות בוקר" },
                { name: "ארוחות עשר" },
                { name: "בראנץ'" },
                { name: "ארוחות צהריים" },
                { name: "ארוחות ערב" },
                { name: "ארוחת לילה" },
                { name: "ארוחה בשרית" },
                { name: "ארוחה דיאטטית" },
                { name: "ארוחה זוגית" },
                { name: "ארוחה זולה" },
                { name: "ארוחה חגיגית" },
                { name: "ארוחה חלבית" },
                { name: "ארוחה מהירה" },
                { name: "ארוחה מושחתת" },
                { name: "ארוחה קלילה" },
                { name: "ארוחת גורמה" },
                { name: "ארוחת ילדים" },
                { name: "ארוחת שבת בבוקר" },
                { name: "ארוחת שישי בערב" },
                { name: "מסיבת יום הולדת" },
                { name: "פיקניק" },
                { name: "בלינצ'ס ופנקייקים" },
                { name: "גלידות וארטיקים" },
                { name: "מאפים מתוקים" },
                { name: "מאפינס וקאפקייקס" },
                { name: "ממתקים" },
                { name: "עוגות" },
                { name: "עוגות בחושות" },
                { name: "עוגות ביסקוויטים" },
                { name: "עוגות גבינה" },
                { name: "עוגות מוס" },
                { name: "עוגות שוקולד" },
                { name: "עוגות תפוזים" },
                { name: "עוגות תפוחים" },
                { name: "עוגיות" },
                { name: "פאי וטארט (מתוקים)" },
                { name: "קינוחי פרווה" },
                { name: "קינוחי שוקולד" },
                { name: "קינוחים אישיים" },
                { name: "קינוחים בכוסות" },
                { name: "קינוחים טבעוניים" },
                { name: "קינוחים ללא גלוטן" },
                { name: "קינוחים ללא סוכר" },
                { name: "ריבות" },
                { name: "עוגות דבש" },
                { name: "עוגה לשבת" },
                { name: "ארוחות" },
                { name: "בשר" },
                { name: "דגים" },
                { name: "מתכונים טבעוניים" },
                { name: "מבשלים עם ילדים" },
                { name: "מאפים מלוחים" },
                { name: "מרקים" },
                { name: "משקאות" },
                { name: "מתכוני חגים" },
                { name: "מתכוני עמים ועדות" },
                { name: "מתכונים ב-10 דקות" },
                { name: "מתכונים בריאים" },
                { name: "מתכונים דיאטטיים" },
                { name: "מתכונים עד 5 מצרכים" },
                { name: "אוכל שילדים אוהבים" },
                { name: "מתכוני עוף" },
                { name: "מתכונים צמחוניים" },
                { name: "קינוחים" },
                { name: "רטבים וממרחים" },
                { name: "תבשילים" },
                { name: "תוספות" },
                { name: "מתכונים לשבת" },
                { name: "קציצות" },
                { name: "לחמים" },
                { name: "לחמניות" },
                { name: "פשטידות" },
                { name: "עוגיות מלוחות" },
                { name: "פוקאצ'ות" },
                { name: "פיצות" },
                { name: "קישים" },
                { name: "כריכים" },
                { name: "אורז" },
                { name: "פסטה" },
                { name: "תפוחי אדמה" },
                { name: "חמוצים" },
                { name: "קטניות וחיטה" },
                { name: "מתכונים לראש השנה" },
                { name: "סוכות" },
                { name: "מתכונים לארוחה מפסקת" },
                { name: "מתכונים לוהטים לחנוכה" },
                { name: "לביבות מלוחות" },
                { name: "לביבות מתוקות" },
                { name: "סופגניות" },
                { name: 'ט"ו בשבט' },
                { name: "יום האהבה" },
                { name: "יום העצמאות" },
                { name: 'ל"ג בעומר' },
                { name: "פורים" },
                { name: "אזני המן מלוחות" },
                { name: "אזני המן מתוקות" },
                { name: "מתכונים לפסח" },
                { name: "קינוחים לפסח" },
                { name: "מתכוני שבועות" },
                { name: "אוכל איטלקי" },
                { name: "אוכל אמריקאי" },
                { name: "אוכל אנגלי" },
                { name: "אוכל אסיאתי" },
                { name: "אוכל ארגנטינאי" },
                { name: "אוכל אתיופי" },
                { name: "אוכל בוכרי" },
                { name: "אוכל בולגרי" },
                { name: "אוכל בלגי" },
                { name: "אוכל בלקני" },
                { name: "אוכל גיאורגי" },
                { name: "אוכל גרמני" },
                { name: "אוכל דרוזי" },
                { name: "אוכל דרום אמריקאי" },
                { name: "אוכל הודי" },
                { name: "אוכל הונגרי" },
                { name: "אוכל ויאטנמי" },
                { name: "אוכל טוניסאי" },
                { name: "אוכל טריפוליטאי" },
                { name: "אוכל יווני" },
                { name: "אוכל יפני" },
                { name: "אוכל כורדי" },
                { name: "אוכל לבנוני" },
                { name: "אוכל לובי" },
                { name: "אוכל מצרי" },
                { name: "אוכל מרוקאי" },
                { name: "אוכל נורבגי" },
                { name: "אוכל סורי" },
                { name: "אוכל סיני" },
                { name: "אוכל ספרדי" },
                { name: "אוכל עיראקי" },
                { name: "אוכל פולני" },
                { name: "אוכל פיליפיני" },
                { name: "אוכל פרסי" },
                { name: "אוכל צרפתי" },
                { name: "אוכל קוריאני" },
                { name: "אוכל רומני" },
                { name: "אוכל רוסי" },
                { name: "אוכל שבדי" },
                { name: "אוכל תאילנדי" },
                { name: "אוכל טורקי" },
                { name: "אוכל תימני" },
            ]
        });

        console.log("Success");
    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect()
    }
}

main();