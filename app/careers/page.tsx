"use client";

import { useState } from "react";
import { useLanguageStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Code,
  TrendingUp,
  Headphones,
  Truck,
  PenTool,
  ChevronDown,
  ChevronUp,
  Upload,
  CheckCircle,
  Building2,
  GraduationCap,
  Heart,
  Coffee,
  Plane,
  Dumbbell,
  X,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: { en: "Senior Frontend Developer", ar: "مطور واجهات أمامية أول" },
    department: { en: "Engineering", ar: "الهندسة" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    type: { en: "Full-time", ar: "دوام كامل" },
    salary: { en: "$3,000 - $5,000/month", ar: "3,000$ - 5,000$ شهرياً" },
    icon: Code,
    description: {
      en: "We're looking for an experienced Frontend Developer to join our team and help build amazing user experiences.",
      ar: "نبحث عن مطور واجهات أمامية ذو خبرة للانضمام إلى فريقنا والمساعدة في بناء تجارب مستخدم مذهلة.",
    },
    requirements: {
      en: [
        "5+ years of experience with React/Next.js",
        "Strong TypeScript skills",
        "Experience with Tailwind CSS",
        "Knowledge of state management (Redux, Zustand)",
        "Excellent problem-solving skills",
      ],
      ar: [
        "5+ سنوات خبرة في React/Next.js",
        "مهارات قوية في TypeScript",
        "خبرة في Tailwind CSS",
        "معرفة بإدارة الحالة (Redux, Zustand)",
        "مهارات ممتازة في حل المشكلات",
      ],
    },
  },
  {
    id: 2,
    title: { en: "Product Manager", ar: "مدير منتج" },
    department: { en: "Product", ar: "المنتجات" },
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    type: { en: "Full-time", ar: "دوام كامل" },
    salary: { en: "$4,000 - $6,000/month", ar: "4,000$ - 6,000$ شهرياً" },
    icon: TrendingUp,
    description: {
      en: "Lead product development initiatives and work closely with engineering and design teams.",
      ar: "قيادة مبادرات تطوير المنتجات والعمل بشكل وثيق مع فرق الهندسة والتصميم.",
    },
    requirements: {
      en: [
        "3+ years of product management experience",
        "Experience in e-commerce industry",
        "Strong analytical skills",
        "Excellent communication abilities",
        "MBA or equivalent experience preferred",
      ],
      ar: [
        "3+ سنوات خبرة في إدارة المنتجات",
        "خبرة في صناعة التجارة الإلكترونية",
        "مهارات تحليلية قوية",
        "قدرات تواصل ممتازة",
        "يفضل حاملي MBA أو خبرة معادلة",
      ],
    },
  },
  {
    id: 3,
    title: { en: "Customer Support Specialist", ar: "أخصائي دعم العملاء" },
    department: { en: "Support", ar: "الدعم" },
    location: { en: "Riyadh, KSA", ar: "الرياض، السعودية" },
    type: { en: "Full-time", ar: "دوام كامل" },
    salary: { en: "$1,500 - $2,500/month", ar: "1,500$ - 2,500$ شهرياً" },
    icon: Headphones,
    description: {
      en: "Provide exceptional customer service and support to our growing customer base.",
      ar: "تقديم خدمة ودعم عملاء استثنائي لقاعدة عملائنا المتنامية.",
    },
    requirements: {
      en: [
        "2+ years of customer service experience",
        "Fluent in Arabic and English",
        "Strong problem-solving skills",
        "Patience and empathy",
        "Experience with CRM tools",
      ],
      ar: [
        "2+ سنوات خبرة في خدمة العملاء",
        "إجادة العربية والإنجليزية",
        "مهارات قوية في حل المشكلات",
        "الصبر والتعاطف",
        "خبرة في أدوات CRM",
      ],
    },
  },
  {
    id: 4,
    title: { en: "Logistics Coordinator", ar: "منسق لوجستيات" },
    department: { en: "Operations", ar: "العمليات" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    type: { en: "Full-time", ar: "دوام كامل" },
    salary: { en: "$1,800 - $2,800/month", ar: "1,800$ - 2,800$ شهرياً" },
    icon: Truck,
    description: {
      en: "Manage and optimize our delivery operations to ensure timely shipments.",
      ar: "إدارة وتحسين عمليات التوصيل لدينا لضمان الشحنات في الوقت المحدد.",
    },
    requirements: {
      en: [
        "3+ years in logistics/supply chain",
        "Experience with warehouse management",
        "Strong organizational skills",
        "Knowledge of shipping regulations",
        "Valid driver's license",
      ],
      ar: [
        "3+ سنوات في اللوجستيات/سلسلة التوريد",
        "خبرة في إدارة المستودعات",
        "مهارات تنظيمية قوية",
        "معرفة بلوائح الشحن",
        "رخصة قيادة سارية",
      ],
    },
  },
  {
    id: 5,
    title: { en: "UI/UX Designer", ar: "مصمم واجهات وتجربة مستخدم" },
    department: { en: "Design", ar: "التصميم" },
    location: { en: "Remote", ar: "عن بعد" },
    type: { en: "Full-time", ar: "دوام كامل" },
    salary: { en: "$2,500 - $4,000/month", ar: "2,500$ - 4,000$ شهرياً" },
    icon: PenTool,
    description: {
      en: "Create beautiful and intuitive designs for our web and mobile platforms.",
      ar: "إنشاء تصاميم جميلة وبديهية لمنصاتنا على الويب والموبايل.",
    },
    requirements: {
      en: [
        "4+ years of UI/UX design experience",
        "Proficiency in Figma and Adobe XD",
        "Strong portfolio required",
        "Understanding of user research",
        "Experience with design systems",
      ],
      ar: [
        "4+ سنوات خبرة في تصميم UI/UX",
        "إتقان Figma و Adobe XD",
        "مطلوب معرض أعمال قوي",
        "فهم بحث المستخدم",
        "خبرة في أنظمة التصميم",
      ],
    },
  },
  {
    id: 6,
    title: { en: "Marketing Manager", ar: "مدير تسويق" },
    department: { en: "Marketing", ar: "التسويق" },
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    type: { en: "Full-time", ar: "دوام كامل" },
    salary: { en: "$3,500 - $5,500/month", ar: "3,500$ - 5,500$ شهرياً" },
    icon: TrendingUp,
    description: {
      en: "Lead our marketing initiatives and grow our brand presence across the region.",
      ar: "قيادة مبادراتنا التسويقية وتنمية حضور علامتنا التجارية في المنطقة.",
    },
    requirements: {
      en: [
        "5+ years of digital marketing experience",
        "Experience with paid advertising",
        "Strong analytical mindset",
        "Leadership experience",
        "Knowledge of SEO/SEM",
      ],
      ar: [
        "5+ سنوات خبرة في التسويق الرقمي",
        "خبرة في الإعلانات المدفوعة",
        "عقلية تحليلية قوية",
        "خبرة في القيادة",
        "معرفة بـ SEO/SEM",
      ],
    },
  },
];

const benefits = [
  {
    icon: Heart,
    title: { en: "Health Insurance", ar: "تأمين صحي" },
    desc: { en: "Comprehensive medical coverage", ar: "تغطية طبية شاملة" },
  },
  {
    icon: Plane,
    title: { en: "Paid Time Off", ar: "إجازات مدفوعة" },
    desc: { en: "25 days annual leave", ar: "25 يوم إجازة سنوية" },
  },
  {
    icon: GraduationCap,
    title: { en: "Learning Budget", ar: "ميزانية تعلم" },
    desc: { en: "$1,000/year for courses", ar: "1,000$ سنوياً للدورات" },
  },
  {
    icon: Coffee,
    title: { en: "Free Snacks", ar: "وجبات خفيفة مجانية" },
    desc: { en: "Fully stocked kitchen", ar: "مطبخ مجهز بالكامل" },
  },
  {
    icon: Dumbbell,
    title: { en: "Gym Membership", ar: "اشتراك رياضي" },
    desc: { en: "Free gym access", ar: "دخول مجاني للنادي" },
  },
  {
    icon: Building2,
    title: { en: "Remote Work", ar: "العمل عن بعد" },
    desc: { en: "Flexible work options", ar: "خيارات عمل مرنة" },
  },
];

export default function CareersPage() {
  const { language } = useLanguageStore();
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<(typeof jobs)[0] | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleApply = (job: (typeof jobs)[0]) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    setFormSubmitted(false);
    setFileName("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div
      className="min-h-screen bg-muted/30"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <div className="bg-linear-to-br from-purple-600 via-pink-500 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-6">
            <Briefcase className="h-5 w-5" />
            <span className="font-medium">
              {language === "ar" ? "انضم لفريقنا" : "Join Our Team"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "ar" ? "الوظائف المتاحة" : "Career Opportunities"}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {language === "ar"
              ? "كن جزءاً من فريق يغير مستقبل التجارة الإلكترونية في المنطقة"
              : "Be part of a team shaping the future of e-commerce in the region"}
          </p>
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm opacity-80">
                {language === "ar" ? "موظف" : "Employees"}
              </div>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm opacity-80">
                {language === "ar" ? "دولة" : "Countries"}
              </div>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-bold">{jobs.length}</div>
              <div className="text-sm opacity-80">
                {language === "ar" ? "وظيفة متاحة" : "Open Positions"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          {language === "ar" ? "لماذا تعمل معنا؟" : "Why Work With Us?"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-4 border text-center hover:shadow-lg transition-shadow"
            >
              <benefit.icon className="h-8 w-8 mx-auto mb-3 text-orange-500" />
              <h3 className="font-semibold text-sm mb-1">
                {benefit.title[language]}
              </h3>
              <p className="text-xs text-muted-foreground">
                {benefit.desc[language]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-8">
          {language === "ar" ? "الوظائف المتاحة" : "Open Positions"}
        </h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-card rounded-xl border overflow-hidden"
            >
              {/* Job Header */}
              <div
                className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() =>
                  setExpandedJob(expandedJob === job.id ? null : job.id)
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-linear-to-br from-orange-500 to-pink-500 text-white">
                      <job.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        {job.title[language]}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {job.department[language]}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location[language]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type[language]}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary[language]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApply(job);
                      }}
                    >
                      {language === "ar" ? "قدم الآن" : "Apply Now"}
                    </Button>
                    {expandedJob === job.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedJob === job.id && (
                <div className="px-6 pb-6 border-t pt-4">
                  <p className="text-muted-foreground mb-4">
                    {job.description[language]}
                  </p>
                  <h4 className="font-semibold mb-2">
                    {language === "ar" ? "المتطلبات:" : "Requirements:"}
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements[language].map((req, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-4 bg-orange-500 hover:bg-orange-600"
                    onClick={() => handleApply(job)}
                  >
                    {language === "ar" ? "قدم على هذه الوظيفة" : "Apply for this position"}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-xl! w-full max-h-[90vh] overflow-y-auto">
            {!formSubmitted ? (
              <>
                {/* Form Header */}
                <div className="p-6 border-b sticky top-0 bg-card rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">
                        {language === "ar" ? "تقديم طلب توظيف" : "Job Application"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedJob.title[language]}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowApplicationForm(false)}
                      className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === "ar" ? "الاسم الكامل" : "Full Name"} *
                    </label>
                    <Input
                      required
                      placeholder={
                        language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"
                      }
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === "ar" ? "البريد الإلكتروني" : "Email Address"} *
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder={
                        language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"
                      }
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === "ar" ? "رقم الهاتف" : "Phone Number"} *
                    </label>
                    <Input
                      type="tel"
                      required
                      placeholder={
                        language === "ar" ? "أدخل رقم هاتفك" : "Enter your phone number"
                      }
                    />
                  </div>

                  {/* LinkedIn */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === "ar" ? "رابط LinkedIn" : "LinkedIn Profile"}
                    </label>
                    <Input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  {/* Portfolio */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === "ar" ? "رابط معرض الأعمال" : "Portfolio URL"}
                    </label>
                    <Input
                      type="url"
                      placeholder="https://..."
                    />
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === "ar" ? "سنوات الخبرة" : "Years of Experience"} *
                    </label>
                    <select
                      required
                      className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                    >
                      <option value="">
                        {language === "ar" ? "اختر..." : "Select..."}
                      </option>
                      <option value="0-1">0-1 {language === "ar" ? "سنة" : "year"}</option>
                      <option value="1-3">1-3 {language === "ar" ? "سنوات" : "years"}</option>
                      <option value="3-5">3-5 {language === "ar" ? "سنوات" : "years"}</option>
                      <option value="5-10">5-10 {language === "ar" ? "سنوات" : "years"}</option>
                      <option value="10+">10+ {language === "ar" ? "سنوات" : "years"}</option>
                    </select>
                  </div>

                  {/* CV Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === "ar" ? "السيرة الذاتية (CV)" : "Resume/CV"} *
                    </label>
                    <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-orange-500 transition-colors cursor-pointer relative">
                      <input
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {fileName ? (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">{fileName}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {language === "ar"
                              ? "اسحب الملف هنا أو انقر للاختيار"
                              : "Drag & drop or click to upload"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PDF, DOC, DOCX (Max 5MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === "ar" ? "رسالة التقديم" : "Cover Letter"}
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 rounded-md border bg-background text-sm resize-none"
                      placeholder={
                        language === "ar"
                          ? "أخبرنا لماذا تريد الانضمام إلى فريقنا..."
                          : "Tell us why you want to join our team..."
                      }
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    {language === "ar" ? "إرسال الطلب" : "Submit Application"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    {language === "ar"
                      ? "بالنقر على إرسال، أنت توافق على سياسة الخصوصية الخاصة بنا"
                      : "By clicking submit, you agree to our Privacy Policy"}
                  </p>
                </form>
              </>
            ) : (
              /* Success Message */
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {language === "ar" ? "تم إرسال طلبك بنجاح!" : "Application Submitted!"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === "ar"
                    ? "شكراً لتقديمك. سنراجع طلبك ونتواصل معك قريباً."
                    : "Thank you for applying. We'll review your application and get back to you soon."}
                </p>
                <Button
                  onClick={() => setShowApplicationForm(false)}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {language === "ar" ? "إغلاق" : "Close"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">
            {language === "ar"
              ? "لم تجد الوظيفة المناسبة؟"
              : "Didn't find the right role?"}
          </h2>
          <p className="opacity-90 mb-6">
            {language === "ar"
              ? "أرسل سيرتك الذاتية وسنتواصل معك عند توفر فرصة مناسبة"
              : "Send us your resume and we'll reach out when a suitable opportunity arises"}
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              setSelectedJob({
                id: 0,
                title: { en: "General Application", ar: "طلب عام" },
                department: { en: "Any", ar: "أي قسم" },
                location: { en: "Any", ar: "أي موقع" },
                type: { en: "Any", ar: "أي نوع" },
                salary: { en: "Negotiable", ar: "قابل للتفاوض" },
                icon: Briefcase,
                description: { en: "", ar: "" },
                requirements: { en: [], ar: [] },
              });
              setShowApplicationForm(true);
              setFormSubmitted(false);
              setFileName("");
            }}
          >
            {language === "ar" ? "أرسل سيرتك الذاتية" : "Submit Your Resume"}
          </Button>
        </div>
      </div>
    </div>
  );
}
