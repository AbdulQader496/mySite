// ─────────────────────────────────────────────────────────────
//  Edit this file to update all content on your portfolio.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Gulam M. A. Qader',
  handle: 'gqader', // shown in the terminal prompt: guest@gqader
  role: 'DevOps Engineer',
  location: 'Dublin, Ireland',
  timezone: 'Europe/Dublin', // used for the live local-time display
  available: true, // shows the availability line
  availability: 'Open to DevOps & Cloud roles in Dublin',
  tagline: 'I help teams ship software faster on secure, reliable cloud infrastructure.',
  about: [
    'DevOps Engineer with 4 years of experience and a strong foundation in AWS, Kubernetes, Docker, Terraform and CI/CD automation. I build reliable cloud environments, streamline software delivery, and support mission-critical applications.',
    'I care about helping teams release faster, reduce operational risk, and run secure, high-performing infrastructure. In September 2026 I graduated from TU Dublin with an MSc in Computing with DevOps with First Class Honours, completed alongside a remote Cloud Engineer role supporting production AWS workloads.',
  ],
  // Put your photo in /public (e.g. public/profile.jpg) and set photo: 'profile.jpg'
  photo: 'profile.jpg',
  resume: '', // e.g. 'resume.pdf' placed in /public
  email: 'gm.abdul.qader@gmail.com',
  socials: [
    { label: 'GitHub', url: 'https://github.com/AbdulQader496' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/abdul-qader' },
  ],
}

// Quick numbers shown in the About section (neofetch)
export const stats = [
  { value: '4+ years', label: 'Experience' },
  { value: '99.9%', label: 'Availability delivered' },
  { value: '3', label: 'Certifications' },
]

export const projects = [
  {
    title: 'HPA vs Predictive HPA',
    year: '2026',
    description:
      'An experiment comparing the reactive Kubernetes Horizontal Pod Autoscaler with the Predictive HPA (linear regression over replica history) on the same Go microservice. Load is generated with k6, metrics collected with Prometheus, and each run is reset, captured and analysed into CSV summaries with shell and Python scripts.',
    tech: ['Kubernetes', 'Minikube', 'Predictive HPA', 'k6', 'Prometheus', 'Go', 'Python', 'GitHub Actions', 'SonarCloud'],
    link: '',
    repo: 'https://github.com/AbdulQader496/Predictive-HPA-vs-HPA---A-comparison-between-two-auto-scaler-in-Kubernetes-',
  },
  {
    title: 'Zero-Downtime Kubernetes',
    year: '2026',
    description:
      'Blue/green, rolling update and canary (Argo Rollouts) release strategies, run on a self-built kubeadm Kubernetes cluster on AWS EC2 (Ubuntu 24.04) with versioned Docker images, documented end to end from bare instance to live rollout.',
    tech: ['Kubernetes', 'kubeadm', 'Argo Rollouts', 'AWS EC2', 'Docker', 'containerd'],
    link: '',
    repo: 'https://github.com/AbdulQader496/k8s-deployment-strategy',
  },
  {
    title: 'Three-Tier AWS Infrastructure',
    year: '2025',
    description:
      'A three-tier architecture across two Availability Zones (public EC2 web tier, private RDS database) provisioned twice: as separate network, application and database CloudFormation stacks, and again with Terraform, including in-place updates to instance type and RDS storage.',
    tech: ['AWS', 'CloudFormation', 'Terraform', 'VPC', 'EC2', 'RDS'],
    link: '',
    repo: 'https://github.com/AbdulQader496/CA2-IT-Infrastructure-and-Automation',
  },
  {
    title: 'IaC & DevSecOps Pipeline',
    year: 'TU Dublin',
    description:
      'Dual-pipeline architecture separating application CI/CD from infrastructure provisioning. The app pipeline enforces code quality, secret detection and vulnerability scanning before deploy; the infrastructure pipeline provisions Azure Kubernetes Service with network policies, hardened images and controlled rollouts.',
    tech: ['Terraform', 'Azure AKS', 'Kubernetes', 'GitLeaks', 'SonarCloud', 'OWASP DC', 'Trivy'],
    link: '',
    repo: '',
  },
  {
    title: 'Terminal Portfolio',
    year: '2026',
    description:
      'This website: a single-page portfolio styled as a terminal session, with an interactive command prompt, typed-out sections and a tmux-style navigation bar.',
    tech: ['React', 'Vite', 'CSS'],
    link: '',
    repo: '',
  },
]

export const skills = [
  { group: 'AWS', items: ['EC2', 'VPC', 'IAM', 'ELB', 'Lambda', 'RDS', 'S3', 'CloudWatch', 'CloudFormation'] },
  { group: 'Azure', items: ['AKS', 'App Service', 'Deployment Slots', 'Application Insights', 'Azure DevOps'] },
  { group: 'DevOps', items: ['Terraform', 'Ansible', 'Docker', 'Kubernetes', 'Jenkins', 'Git & GitHub', 'Linux / Ubuntu'] },
  { group: 'Monitoring', items: ['Prometheus', 'Grafana', 'CloudWatch', 'Application Insights'] },
  { group: 'DevSecOps', items: ['GitLeaks', 'SonarCloud', 'OWASP Dependency Check', 'Trivy'] },
  { group: 'Languages', items: ['Python', 'Bash', 'JavaScript', 'Node.js', 'Java', 'PHP'] },
  { group: 'Databases', items: ['MySQL', 'MongoDB', 'NoSQL'] },
  { group: 'Soft Skills', items: ['Communication', 'Cross-functional collaboration', 'Adaptability', 'Problem-solving', 'Attention to detail'] },
]

export const experience = [
  {
    role: 'Cloud Engineer',
    company: 'Ipinfra Networks Sdn Bhd',
    location: 'Cyberjaya, Malaysia · now remote (contract)',
    period: 'Sep 2022 — Present',
    points: [
      'Design, configure and maintain AWS infrastructure (EC2, VPC, IAM, Security Groups, Route Tables, ELB) for secure, highly available production workloads.',
      'Package and deploy containerised Python and PHP services with Docker and Kubernetes, achieving 99.9% availability and reducing deployment failures by 30%.',
      'Monitor infrastructure with CloudWatch, Grafana and Prometheus: triage alerts, investigate incidents and contribute to post-incident reviews to reduce MTTR.',
      'Write Python and Bash automation to cut manual operational work and standardise configuration across environments.',
      'Implemented automated backup and recovery with EBS snapshots and RDS automated backups, improving disaster-recovery readiness.',
      'Manage Linux servers and cloud networking (subnets, NAT Gateways, IAM policies) across development and production.',
    ],
  },
  {
    role: 'SQA Test Automation Engineer',
    company: 'A1QA',
    location: 'Remote · contract (US-based team)',
    period: 'Nov 2023 — May 2024',
    points: [
      'Added automated API and regression test execution to Jenkins pipelines, catching defects before deployment and reducing manual testing effort.',
      'Built automated test reports in Jenkins, giving developers immediate feedback on failures.',
      'Worked with developers and DevOps engineers to investigate pipeline failures and improve release stability.',
      'Took part in sprint planning, backlog refinement and retrospectives.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'Gigalink Solutions Sdn Bhd',
    location: 'Selangor, Malaysia',
    period: 'Feb 2022 — Aug 2022',
    points: [
      'Supported development and maintenance of production web applications across the full delivery lifecycle.',
      'Collaborated with senior engineers to turn business requirements into deployable features.',
      'Assisted with testing, bug resolution and release documentation.',
    ],
  },
]

export const education = [
  {
    degree: 'MSc in Computing with DevOps',
    school: 'Technological University Dublin',
    location: 'Dublin, Ireland',
    period: 'Sep 2025 — Sep 2026',
    grade: 'First Class Honours · CGPA 3.67',
    details: 'Academic project: Infrastructure as Code & DevSecOps pipeline on Azure Kubernetes Service.',
  },
  {
    degree: 'Bachelor of Software Engineering',
    school: 'Universiti Putra Malaysia',
    location: 'Serdang, Malaysia',
    period: 'Sep 2018 — Aug 2022',
    grade: 'CGPA 3.38',
    details: '',
  },
]

export const certifications = [
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2026', url: '' },
  { name: 'AWS Academy Graduate — Cloud Architecting', issuer: 'AWS Academy', year: '2026', url: '' },
  { name: 'Mastering DevOps: From Fundamentals to Advanced Practices', issuer: '', year: '2025', url: '' },
]
