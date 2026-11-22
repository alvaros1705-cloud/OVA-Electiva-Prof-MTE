export interface LessonSection {
  id: string;
  title: string;
  summary: string;
  content: string[];
  keyPoints: string[];
  practicalApplication?: string;
}

export interface CaseStudyOption {
  id: string;
  text: string;
  isBest: boolean;
  score: number;
  feedback: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  companyScenario: string;
  contextBackground: string;
  dilemma: string;
  options: CaseStudyOption[];
  learningOutcome: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type SimulatorType =
  | 'design-thinking'
  | 'ciberseguridad'
  | 'riesgos'
  | 'cultura'
  | 'cambio';

export interface ModuleData {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  competencies: string[];
  duration: string;
  level: string;
  iconName: string;
  heroImage: string;
  simulatorType: SimulatorType;
  simulatorTitle: string;
  sections: LessonSection[];
  caseStudy: CaseStudy;
  quiz: QuizQuestion[];
  references?: {
    title: string;
    institution: string;
    detail: string;
  }[];
}

export interface UserProgress {
  completedModules: string[]; // module ids
  moduleQuizScores: Record<string, number>; // moduleId -> score (0-100)
  moduleVisits: Record<string, boolean>; // moduleId -> true
  studentName: string;
  studentId: string;
  issuedAt?: string;
}
