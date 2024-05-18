import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { MetadataService } from 'src/app/services/generic/metadata.service';
import { SkeletonComponent } from 'src/app/shared/components/skeleton/skeleton.component';
import { AccordionModule } from 'primeng/accordion';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonComponent,
    AccordionModule,
    FooterComponent
  ],
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent {
  faqs: any = {
    general: [
      {
        question: 'كيفية حجز جلسة أونلاين ؟',
        answer: `
    <div>
      <p>اولا: اختر المجال المناسب من بين المجالات: استشارات نفسية، زوجية وأسرية، طبية، أو استشارات تغذية.</p>
      <p>ثانيا: قم بإنشاء حساب بالايميل أو رقم الهاتف الخاص بك، ثم اختر الخبير المناسب لحالتك. اضغط على أقرب ميعاد لكل خبير أو للمزيد من المواعيد يرجى الضغط على (مواعيد أخرى)</p>
      <p>ثالثا: بعد اختيار الميعاد المناسب، يرجى الضغط على (احجز الجلسة) لتحويلك إلى صفحة الدفع. ستظهر لك 3 طرق لدفع الجلسة ( فوري/ فودافون كاش/ كارت الائتمان)</p>
      <p><strong>في حالة وجود كود خصم يرجى كتابة الكود قبل اختيار وسيلة الدفع والتأكد من تفعيله بنجاح</strong></p>
      <p>رابعا: بعد اختيار وسيلة الدفع سيتم ارسال ايميل ورسالة تأكيدية بنجاح عملية الدفع تحتوي على تفاصيل الجلسة ورابط للدخول على الموقع وتسجيل الدخول بالايميل او رقم الهاتف وكلمة السر الخاصة بك ثم الدخول على "جلساتي" لبدء الجلسة</p>
      <p>هناك ثلاث اختيارات في الصفحة الخاصة بجلساتي</p>
      <p>انضم للجلسة: يتم فتح رابط الجلسة قبل الميعاد بعشر دقائق</p>
      <p>الغاء الجلسة: يرجى الاطلاع على سياسة الغاء الجلسات</p>
      <p>ارسال ايميل للخبير: يتم استخدامه في حالة ارسال مستندات للخبير بعد الجلسة.</p>
      <p>يتم ارسال رسالة تذكيرية على الهاتف قبل الجلسة بساعة لتذكير العميل بميعاد الجلسة</p>
    </div>`
      },
      {
        question: 'كيفية اختيار الخبير المناسب ؟',
        answer: `<div>
          <p>اختيار الخبير او المعالج المناسب يتم على حسب كل حالة.</p>
          <p>بالنسبة للمجال الطبي، يتم اختيار الطبيب على حسب التخصص اما المجال النفسي يتم الاختيار بين الطبيب النفسي والأخصائي أو المعالج النفسي</p>
          <p><strong>الطبيب النفسي:</strong></p>
          <ul>
              <li>الطب النفسي هو فرع من فروع كلية الطب.</li>
              <li>يعمل الطبيب النفسي على المستوى النفسي و البيولوجي في ذات الوقت لفهم طبيعة جسم الانسان و تاريخه.</li>
              <li>يستطيع الطبيب النفسي وصف أدوية نفسية و معرفة أعراضها و الأدوية التي تتعارض مع حالة الشخص.</li>
          </ul>
          <p><strong>الأخصائي او المعالج النفسي:</strong></p>
          <ul>
              <li>شخص يدرس علم نفس</li>
              <li>يساعد الاشخاص على فهم و تفسير تغيراتهم السلوكية وذلك بعدما يحصل على تدريب مكثف في هذا المجال.</li>
              <li>متخصصون في حل المشكلات مثل اضطرابات النوم والتوتر في العلاقات العاطفية والمشاكل السلوكية وغيرها.</li>
              <li>لا يمكن للأخصائي النفسي وصف علاج دوائي، لكنه يعرف جيدًا كيف يتعامل بشكل علمي واحترافي مع المشاكل النفسية</li>
          </ul>
          <p>المجال الغذائي:</p>
          <p>ما الفرق بين الاستشارة و المتابعة و ما سبب اختلاف السعر بينهما؟</p>
          <p>الاستشارة هي الجلسة الاولى التي يحدد الدكتور من خلالها النظام الغذائي المطلوب اتباعه و التحاليل المطلوبة إن وجدت لتحديد النظام الغذائي الأمثل، بعدها يتم ارسال النظام الغذائي للمستخدم عن طريق الايميل، ويتم الاتفاق على ميعاد للمتابعة بعد مدة محددة لتحليل النتائج وتجديد النظام الغذائي للفترة التالية حسب حاجة الحالة واستجابتها.</p>
          <p>المجال الطبي:</p>
          <p>هل الإستشارة بديلة للكشف؟</p>
          <p>الاستشارات الطبية الإلكترونية لا تعتبر بديلاً عن الاستشارة الطبية المهنية في العيادة لكنها تساعد على تشخيص مبدئي للحالة وتوجيهها للخطوة التالية من حيث التخصص المناسب والتحاليل والأشعات المطلوبة.</p>
      </div>`
      }
    ],
    others: [
      {
        question: 'ماذا افعل إذا واجهت اي مشكلة قبل أو بعد الجلسة ؟',
        answer: `<div>
        <p>يرجى الدخول على الموقع للتحدث مع أحد أفراد فريق الدعم الفني المتاح لخدار الساعة سواء قبل الجلسة لمساعدتك في دخول الجلسة أو اثناء الجلسة أو بعد انتهاء الجلسة.</p>
           </div>`
      },
      {
        question: 'كم عدد الجلسات التي يتم حجزها مع الطبيب أو المعالج ؟',
        answer: `<div>
        <p>عدد الجلسات تختلف من شخص لأخر و لكن الحد الأقصى يكون 6 جلسات و يتم تحديدها بين المستخدم و المعالج الخاص بالحالة.</p>
           </div>`
      }
    ]
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private metadataService: MetadataService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateMetaTags();
    }
    if (isPlatformServer(this.platformId)) {
      this.updateMetaTags();
    }
  }

  private updateMetaTags(): void {
    this.metadataService.updateTitle('تلبينة | الأسئلة و الإستفسارات ');
    this.metadataService.updateMetaTagsName([
      { name: 'title', content: 'تلبينة | الأسئلة و الإستفسارات' },
      { name: 'description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { name: 'date', content: '2023-10-29T09:28:59+00:00' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'http://talbinah.net/' },
      { name: 'twitter:site', content: '@Talbinahco' },
      { name: 'twitter:title', content: 'تلبينة | الأسئلة و الإستفسارات' },
      { name: 'twitter:description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { name: 'twitter:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
    ]);
    this.metadataService.updateMetaTagsProperty([
      { property: 'og:locale', content: 'ar_AR' },
      { property: 'article:publisher', content: 'https://www.facebook.com/Talbinahco/' },
      { property: 'article:modified_time', content: '2023-10-29T09:28:59+00:00' },

      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'http://talbinah.net/' },
      { property: 'og:title', content: 'تلبينة | الأسئلة و الإستفسارات' },
      { property: 'og:description', content: 'احصل على الصحة النفسية التي تحتاجها مع تطبيق تلبينة. جلسات علاج نفسي مع أفضل أخصائي الطب النفسي في السعودية، متاحة لك في راحة بمنزلك عبر الإنترنت. ابدأ علاجك النفسي اليوم' },
      { property: 'og:image', content: 'https://talbinah.net/assets/images/main/logos/logo_talbinah.png' },
      { property: 'twitter:site_name', content: 'تطبيق تلبينة' }
    ]);
  }
}
