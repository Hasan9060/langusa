"use client";
import { useEffect, useState } from "react";

export default function DailyWords() {
  // 80 local English → Urdu words
  const allWords = [
    {word:"learn", en: "To gain knowledge or skill.", ur: "سیکھنا" },
    {word:"success", en: "The achievement of a goal.", ur: "کامیابی" },
    {word:"beautiful", en: "Pleasing to the senses.", ur: "خوبصورت" },
    {word:"freedom", en: "The right to act or think freely.", ur: "آزادی" },
    {word:"courage", en: "The ability to face fear.", ur: "حوصلہ" },
    {word:"hope", en: "A feeling of expectation and desire.", ur: "امید" },
    {word:"wisdom", en: "The quality of having experience and knowledge.", ur: "دانائی" },
    {word:"peace", en: "Freedom from disturbance; calm.", ur: "امن" },
    {word:"patience", en: "The ability to wait calmly.", ur: "صبر" },
    {word:"faith", en: "Complete trust or confidence in something.", ur: "ایمان" },
    {word:"unity", en: "Being joined as a whole.", ur: "اتحاد" },
    {word:"truth", en: "The quality of being true.", ur: "سچائی" },
    {word:"kindness", en: "Being friendly and generous.", ur: "مہربانی" },
    {word:"respect", en: "Admiration for someone.", ur: "عزت" },
    {word:"honesty", en: "The quality of being honest.", ur: "ایمانداری" },
    {word:"hardwork", en: "A great deal of effort.", ur: "محنت" },
    {word:"focus", en: "Concentrated attention.", ur: "توجہ" },
    {word:"discipline", en: "Training to obey rules.", ur: "نظم و ضبط" },
    {word:"dream", en: "A cherished aspiration.", ur: "خواب" },
    {word:"gratitude", en: "The quality of being thankful.", ur: "شکریہ" },
    {word:"friendship", en: "Mutual trust between friends.", ur: "دوستی" },
    {word:"justice", en: "Fair behavior or treatment.", ur: "انصاف" },
    {word:"compassion", en: "Concern for others' suffering.", ur: "رحم" },
    {word:"forgiveness", en: "The act of forgiving.", ur: "معافی" },
    {word:"loyalty", en: "Strong feeling of support.", ur: "وفاداری" },
    {word:"balance", en: "Even distribution of elements.", ur: "توازن" },
    {word:"innovation", en: "Introducing new ideas.", ur: "جدت" },
    {word:"motivation", en: "Reason for acting.", ur: "حوصلہ افزائی" },
    {word:"effort", en: "A vigorous attempt.", ur: "کوشش" },
    {word:"time", en: "A measurable period.", ur: "وقت" },
    {word:"goal", en: "An aim or desired result.", ur: "مقصد" },
    {word:"mindset", en: "A way of thinking.", ur: "سوچ" },
    {word:"knowledge", en: "Information and skills from learning.", ur: "علم" },
    {word:"creative", en: "Having imagination.", ur: "تخلیقی" },
    {word:"strong", en: "Having power.", ur: "طاقتور" },
    {word:"calm", en: "Free from agitation.", ur: "پرسکون" },
    {word:"energy", en: "Strength for activity.", ur: "توانائی" },
    {word:"humble", en: "Modest view of one’s importance.", ur: "عاجز" },
    {word:"truthful", en: "Telling the truth.", ur: "سچا" },
    {word:"faithful", en: "Loyal and steadfast.", ur: "ایماندار" },
    {word:"respectful", en: "Showing politeness.", ur: "باادب" },
    {word:"honor", en: "High respect or esteem.", ur: "عزت" },
    {word:"responsible", en: "Accountable for something.", ur: "ذمہ دار" },
    {word:"generous", en: "Willing to share.", ur: "سخی" },
    {word:"smile", en: "A pleased expression.", ur: "مسکراہٹ" },
    {word:"positive", en: "Optimistic attitude.", ur: "مثبت" },
    {word:"active", en: "Energetic and lively.", ur: "فعال" },
    {word:"teamwork", en: "Working together effectively.", ur: "مل جل کر کام کرنا" },
    {word:"trust", en: "Firm belief in reliability.", ur: "اعتماد" },
    {word:"talent", en: "Natural aptitude or skill.", ur: "صلاحیت" },
    {word:"confidence", en: "Feeling of self-assurance.", ur: "اعتماد" },
    {word:"value", en: "Principles or standards.", ur: "قدر" },
    {word:"change", en: "Make something different.", ur: "تبدیلی" },
    {word:"belief", en: "Acceptance that something is true.", ur: "یقین" },
    {word:"growth", en: "The process of developing.", ur: "ترقی" },
    {word:"calmness", en: "State of being calm.", ur: "سکون" },
    {word:"selfless", en: "Concerned for others.", ur: "بے غرض" },
    {word:"forgive", en: "Stop feeling angry.", ur: "معاف کرنا" },
    {word:"listen", en: "Give attention to sound.", ur: "سننا" },
    {word:"teach", en: "Impart knowledge.", ur: "پڑھانا" },
    {word:"care", en: "Feel concern.", ur: "دھیان رکھنا" },
    {word:"help", en: "Make easier for someone.", ur: "مدد کرنا" },
    {word:"achieve", en: "Bring about successfully.", ur: "حاصل کرنا" },
    {word:"improve", en: "Make better.", ur: "بہتر کرنا" },
    {word:"enjoy", en: "Take pleasure in.", ur: "مزہ لینا" },
    {word:"create", en: "Bring into existence.", ur: "بننا" },
    {word:"explore", en: "Discover new things.", ur: "دریافت کرنا" },
    {word:"observe", en: "Notice or perceive.", ur: "مشاہدہ کرنا" },
    {word:"decide", en: "Come to a resolution.", ur: "فیصلہ کرنا" },
    {word:"understand", en: "Grasp the meaning.", ur: "سمجھنا" },
    {word:"build", en: "Construct by putting parts together.", ur: "تعمیر کرنا" },
    {word:"share", en: "Have a portion with others.", ur: "بانٹنا" },
    {word:"love", en: "Feeling of affection.", ur: "محبت" },
    {word:"careful", en: "Avoid danger or mistakes.", ur: "احتیاط سے" },
    {word:"adventure", "en": "An exciting or unusual experience.", "ur": "مہم جوئی" },
    { word: "perseverance", "en": "Persistence in doing something despite difficulty.", "ur": "استقامت" },
    { word: "excellence", "en": "The quality of being outstanding.", "ur": "فضیلت" },
    { word: "integrity", "en": "Being honest and having strong moral principles.", "ur": "سالمیت" },
    { word: "determination", "en": "Firmness of purpose.", "ur": "عزم" },
    { word: "resilience", "en": "The ability to recover quickly from difficulties.", "ur": "لچک" },
    { word: "opportunity", "en": "A set of circumstances that makes it possible to do something.", "ur": "موقع" },
    { word: "clarity", "en": "The quality of being coherent and intelligible.", "ur": "وضاحت" },
    { word: "potential", "en": "Having or showing the capacity to develop into something in the future.", "ur": "صلاحیت" },
    { word: "imagination", "en": "The faculty of forming new ideas.", "ur": "تخیل" },
    { word: "emotion", "en": "A strong feeling deriving from one's circumstances.", "ur": "جذبہ" },
    { word: "praise", "en": "Expression of approval and admiration.", "ur": "تعریف" },
    { word: "respectful", "en": "Showing politeness and high regard.", "ur": "باعزت" },
    { word: "authentic", "en": "Of undisputed origin; genuine.", "ur": "حقیقی" },
    { word: "vibrant", "en": "Full of energy and enthusiasm.", "ur": "جاندار" },
    { word: "unique", "en": "Being the only one of its kind.", "ur": "منفرد" },
    { word: "gentle", "en": "Having a mild, kind, or tender temperament.", "ur": "نرم" },
    { word: "flexible", "en": "Capable of bending or adapting.", "ur": "لچکدار" },
    { word: "sincere", "en": "Free from pretense or deceit; honest.", "ur": "مخلص" },
    { word: "radiant", "en": "Sending out light; glowing.", "ur": "روشن" },
    { word: "prosper", "en": "Succeed in material terms; flourish.", "ur": "کامیاب ہونا" },
    { word: "inspire", "en": "Fill someone with the urge or ability to do something.", "ur": "حوصلہ دینا" },
    { word: "nurture", "en": "Care for and encourage the growth or development of.", "ur": "پرورش کرنا" },
    { word: "embrace", "en": "Hold closely in one's arms or accept a new idea.", "ur": "گلے لگانا" },
    { word: "reflect", "en": "Think deeply or carefully about.", "ur": "غور کرنا" },
    { word: "commit", "en": "Pledge or bind a person to a course of action.", "ur": "عہد کرنا" },
    { word: "develop", "en": "Grow or cause to grow and become more mature.", "ur": "ترقی کرنا" },
    { word: "connect", "en": "Bring together or into contact.", "ur": "جوڑنا" },
    { word: "visualize", "en": "Form a mental image of.", "ur": "تصور کرنا" },
    { word: "celebrate", "en": "Acknowledge a significant day or event with a party.", "ur": "جشن منانا" },
    { word: "explore", "en": "Travel in or through an unfamiliar area in order to learn about it.", "ur": "تلاش کرنا" },
    { word: "discover", "en": "Find something unexpectedly or during a search.", "ur": "دریافت کرنا" },
    { word: "cherish", "en": "Protect and care for someone or something lovingly.", "ur": "عزیز رکھنا" },
    { word: "uplift", "en": "Raise or lift up.", "ur": "بلند کرنا" },
    { word: "sympathy", "en": "Feelings of pity and sorrow for someone else's misfortune.", "ur": "ہمدردی" },
    { word: "serenity", "en": "The state of being calm, peaceful, and untroubled.", "ur": "سکون" },
    { word: "magnify", "en": "Make something appear larger than it is.", "ur": "بڑا کرنا" },
    { word: "dedication", "en": "The quality of being committed to a task or purpose.", "ur": "لگن" },
    { word: "abundance", "en": "A very large quantity of something.", "ur": "فراوانی" },
    { word: "perspective", "en": "A particular attitude toward or way of regarding something.", "ur": "نقطہ نظر" },
    { word: "maturity", "en": "The state, fact, or period of being mature.", "ur": "پختگی" },
    { word: "awareness", "en": "Knowledge or perception of a situation or fact.", "ur": "آگاہی" },
    { word: "wisdom", "en": "The quality of having experience, knowledge, and good judgment.", "ur": "دانش" },
    { word: "curiosity", "en": "A strong desire to know or learn something.", "ur": "تجسس" },
    { word: "resource", "en": "A stock or supply of money, materials, staff, and other assets.", "ur": "وسیلہ" },
    { word: "courageous", "en": "Not deterred by danger or pain; brave.", "ur": "بہادر" },
    { word: "genuine", "en": "Truly what something is said to be; authentic.", "ur": "اصلی" },
    { word: "luminous", "en": "Full of or shedding light; bright or shining.", "ur": "چمکدار" },
    { word: "diligent", "en": "Having or showing care and conscientiousness in one's work.", "ur": "محنتی" },
    { word: "reliable", "en": "Consistently good in quality or performance; able to be trusted.", "ur": "قابل اعتماد" },
    { word: "profound", "en": "Very great or intense.", "ur": "گہرا" },
    { word: "eloquent", "en": "Fluent or persuasive in speaking or writing.", "ur": "فصیح" },
    { word: "harmonious", "en": "Forming a pleasing or consistent whole.", "ur": "ہم آہنگ" },
    { word: "invigorate", "en": "Give strength or energy to.", "ur": "طاقت بخشنا" },
    { word: "contribute", "en": "Give (something) in order to help achieve or provide something.", "ur": "حصہ ڈالنا" },
    { word: "sustain", "en": "Strengthen or support physically or mentally.", "ur": "برقرار رکھنا" },
    { word: "reform", "en": "Make changes in something to improve it.", "ur": "اصلاح کرنا" },
    { word: "transcend", "en": "Go beyond the range or limits of (something abstract, typically a conceptual field or division).", "ur": "ماورا ہونا" },
    { word: "unite", "en": "Come together for a common purpose or action.", "ur": "متحد کرنا" },
    { word: "strengthen", "en": "Make or become stronger.", "ur": "مضبوط کرنا" },
    { word: "illuminate", "en": "Light up.", "ur": "روشن کرنا" },
    { word: "motivate", "en": "Provide someone with a reason for doing something.", "ur": "تحریک دینا" },
    { word: "cherish", "en": "Protect and care for someone or something lovingly.", "ur": "دل و جان سے چاہنا" },
    { word: "empathy", "en": "The ability to understand and share the feelings of another.", "ur": "ہمدردی" },
    { word: "intuition", "en": "The ability to understand something immediately, without the need for conscious reasoning.", "ur": "وجدان" },
    { word: "efficiency", "en": "The state of achieving maximum productivity with minimum wasted effort or expense.", "ur": "کارکردگی" },
    { word: "prosperity", "en": "The state of being successful, typically by making money.", "ur": "خوشحالی" },
    { word: "benevolence", "en": "The quality of being well meaning; kindness.", "ur": "فیاضی" },
    { word: "optimism", "en": "Hopefulness and confidence about the future.", "ur": "رجائیت" },
    { word: "dignity", "en": "The state or quality of being worthy of honor or respect.", "ur": "وقار" },
    { word: "vulnerability", "en": "The state of being exposed to the possibility of being attacked or harmed.", "ur": "کمزوری" },
    { word: "reflection", "en": "Serious thought or consideration.", "ur": "غور و فکر" },
    { word: "creativity", "en": "The use of imagination or original ideas.", "ur": "تخلیقی صلاحیت" },
    { word: "spiritual", "en": "Relating to the human spirit or soul.", "ur": "روحانی" },
    { word: "modesty", "en": "The quality or state of being unassuming in the estimation of one's abilities.", "ur": "انکساری" },
    { word: "capable", "en": "Having the ability, fitness, or quality necessary to do or achieve a specified thing.", "ur": "قابل" },
    { word: "pivotal", "en": "Of crucial importance in relation to the development or success of something else.", "ur": "مرکزی" },
    { word: "vivid", "en": "Producing powerful feelings or strong, clear images in the mind.", "ur": "واضح" },
    { word: "genuine", "en": "Truly what something is said to be; authentic.", "ur": "خالص" },
    { word: "fervent", "en": "Having or displaying a passionate intensity.", "ur": "پرجوش" },
    { word: "spontaneous", "en": "Performing or observing an action or feeling suddenly or without planning.", "ur": "فوری" },
    { word: "empower", "en": "Make (someone) stronger and more confident.", "ur": "بااختیار بنانا" },
    { word: "cultivate", "en": "Try to acquire or develop (a quality, sentiment, or skill).", "ur": "فروغ دینا" },
    { word: "resolve", "en": "Settle or find a solution to (a problem or contentious matter).", "ur": "حل کرنا" },
    { word: "transform", "en": "Make a thorough or dramatic change in the form, appearance, or character of.", "ur": "تبدیل کرنا" },
    { word: "inspire", "en": "Fill someone with the urge or ability to do or feel something.", "ur": "الہام دینا" },
    { word: "demonstrate", "en": "Clearly show the existence or truth of (something).", "ur": "ثابت کرنا" },
    { word: "prevail", "en": "Prove more powerful or superior.", "ur": "غالب آنا" },
    { word: "strive", "en": "Make great efforts to achieve or obtain something.", "ur": "کوشش کرنا" },
    { word: "uplift", "en": "Raise or lift up.", "ur": "اٹھانا" },
    { word: "gratify", "en": "Give someone pleasure or satisfaction.", "ur": "خوش کرنا" },
    { word: "discipline", "en": "The practice of training people to obey rules or a code of behavior.", "ur": "اصول و ضوابط" },
    { word: "integrity", "en": "The quality of being honest and having strong moral principles.", "ur": "دیانت داری" },
    { word: "commitment", "en": "The state or quality of being dedicated to a cause, activity, etc.", "ur": "عہد" },
    { word: "sympathy", "en": "Feelings of pity and sorrow for someone else's misfortune.", "ur": "ہمدردی" },
    { word: "calmness", "en": "The state or quality of being free from agitation or strong emotion.", "ur": "خاموشی" },
    { word: "guidance", "en": "Advice or information aimed at resolving a problem or difficulty.", "ur": "رہنمائی" },
    { word: "merit", "en": "The quality of being particularly good or worthy.", "ur": "قابلیت" },
    { word: "nourish", "en": "Provide with the food or other substances necessary for growth, health, and good condition.", "ur": "غذا دینا" },
    { word: "explore", "en": "Inquire into or discuss (a subject) in detail.", "ur": "جائزہ لینا" }
  ];

  const [dailyWords, setDailyWords] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // ✅ Detect mobile screen
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    // ✅ Select 3 random words daily (based on date)
    const today = new Date().getDate();
    const startIndex = (today * 3) % allWords.length;
    const selected = allWords.slice(startIndex, startIndex + 3);
    setDailyWords(selected);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Only show 3 on mobile unless "Show More" clicked
  const visibleWords =
    isMobile && !showAll ? dailyWords.slice(0, 3) : dailyWords;

  return (
    <div className="px-2 pb-16 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_1px)] dark:bg-black">
      <div className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-4xl mx-auto border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-green-600 dark:text-yellow-400">
          Words of the Day
        </h2>

        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full text-sm sm:text-base border-collapse overflow-hidden">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100">
                <th className="border border-blue-200 dark:border-blue-700 px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold">
                  Word
                </th>
                <th className="border border-blue-200 dark:border-blue-700 px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold">
                  Meaning English
                </th>
                <th className="border border-blue-200 dark:border-blue-700 px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold">
                  Meaning Urdu
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleWords.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <td className="border border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 dark:text-white">
                    {item.word}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 sm:py-3 text-gray-700 dark:text-gray-300">
                    {item.en}
                  </td>
                  <td className="border border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 sm:py-3 text-right text-gray-800 dark:text-gray-200 font-urdu">
                    {item.ur}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Show More Button (Mobile Only) */}
        {isMobile && dailyWords.length > 3 && (
          <div className="text-center mt-4">
          </div>
        )}
      </div>
    </div>
  );
}
