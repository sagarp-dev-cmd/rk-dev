import logo from "/src/assets/images/logo.png"

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="app-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Loved by job seekers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how JobTrackly has helped others organize their job search and land their dream roles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Rohit k."
            role="Senior Software Engineer"
            quote="JobTrackly helped me stay organized during my job search. I applied to over 50 positions and never lost track of a single one!"
            image="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="

 
          />
          <TestimonialCard
            name="Parth C."
            role="Devops Engineer"
            quote="The follow-up reminders were a game-changer. I was able to stay on top of my applications and it definitely helped me land more interviews."
            image="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="


          />   
          <TestimonialCard
            name="Pk."
            role="Software Engineer"
            quote="I love being able to see my job search progress at a glance. The dashboard gives me motivation as I see my applications moving through the pipeline."
            image="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="


          />
        </div>
      </div> 
    </section>
  );
}

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  image: string; // ✅ Add image prop

}

function TestimonialCard({ name, role, quote, image }: TestimonialCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border">
      <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-primary/20 rounded-full overflow-hidden">
          <img
            src={image}
            alt={`${name}'s photo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <p className="text-muted-foreground">{quote}</p>
    </div>
  );
}
