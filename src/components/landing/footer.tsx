export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/40 bg-muted/10 text-center text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8 text-left">
        <div>
          <h4 className="font-bold text-foreground mb-4">Product</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Security
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                API Status
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-foreground mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          &copy; {new Date().getFullYear()} FinanceTracker. All rights reserved.
        </p>
        <div className="flex gap-4">{/* Social icons could go here */}</div>
      </div>
    </footer>
  );
}
