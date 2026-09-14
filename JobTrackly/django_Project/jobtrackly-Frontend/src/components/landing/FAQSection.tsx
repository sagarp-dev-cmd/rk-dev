
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <section className="py-20 bg-background">
      <div className="app-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about JobTrackly
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is JobTrackly free to use?</AccordionTrigger>
              <AccordionContent>
                Yes, JobTrackly offers a free plan that includes all essential features for managing your job search. We also offer premium plans for users who need advanced features.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How can I organize my job applications?</AccordionTrigger>
              <AccordionContent>
                JobTrackly provides an intuitive dashboard where you can track all your applications. You can add new jobs, update their status, add notes, and set reminders for follow-ups. Everything is organized in one place for easy management.
              </AccordionContent>
            </AccordionItem>

            {/* <AccordionItem value="item-3">
              <AccordionTrigger>Can I track multiple versions of my resume?</AccordionTrigger>
              <AccordionContent>
                Yes, you can upload and manage multiple versions of your resume. This is particularly useful when applying to different types of positions or industries, allowing you to track which version you used for each application.
              </AccordionContent>
            </AccordionItem> */}

            <AccordionItem value="item-4">
              <AccordionTrigger>How does the reminder system work?</AccordionTrigger>
              <AccordionContent>
                Our smart reminder system allows you to set custom follow-up dates for each application. You'll receive notifications when it's time to follow up, ensuring you never miss an important deadline or opportunity to connect with employers.
              </AccordionContent>
            </AccordionItem>

            {/* <AccordionItem value="item-5">
              <AccordionTrigger>Can I export my application data?</AccordionTrigger>
              <AccordionContent>
                Yes, JobTrackly allows you to export your application data in various formats. This is useful for creating reports, sharing information with mentors, or keeping backups of your job search progress.
              </AccordionContent>
            </AccordionItem> */}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
