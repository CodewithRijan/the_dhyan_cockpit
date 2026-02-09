import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, CheckCircle } from 'lucide-react';

interface CompletedTask {
  id: string;
  title: string;
  time: string;
}

interface SessionEntry {
  id: string;
  date: string;
  day: number;
  sessionName: string;
  duration: string;
  sessionTime: string;
  completedTasks: CompletedTask[];
  tasksCount?: number;
  isExpanded?: boolean;
}

interface DashboardProps {
  totalFocusTime?: string;
  tasksCompleted?: number;
  sessions?: SessionEntry[];
}

const MOCK_SESSIONS: SessionEntry[] = [
  {
    id: '1',
    date: 'Oct',
    day: 24,
    sessionName: 'Deep Work Session',
    duration: '25:00',
    sessionTime: '10:45 AM',
    completedTasks: [
      { id: '1', title: 'Design dashboard system architecture', time: '10:52 AM' },
      { id: '2', title: 'Review and refactor authentication service hooks', time: '11:04 AM' },
      { id: '3', title: 'Update brand colors in configuration', time: '11:09 AM' },
    ],
    tasksCount: 3,
  },
  {
    id: '2',
    date: 'Oct',
    day: 24,
    sessionName: 'Quick Sprint',
    duration: '15:00',
    sessionTime: '14:30 PM',
    completedTasks: [],
    tasksCount: 1,
  },
  {
    id: '3',
    date: 'Oct',
    day: 23,
    sessionName: 'Evening Review',
    duration: '45:00',
    sessionTime: '18:00 PM',
    completedTasks: [],
    tasksCount: 5,
  },
];

export default function Dashboard({
  totalFocusTime = '42:15',
  tasksCompleted = 128,
  sessions = MOCK_SESSIONS,
}: DashboardProps) {
  const [expandedSession, setExpandedSession] = useState<string>('1');
  const [filterTab, setFilterTab] = useState<'all' | 'week' | 'month'>('all');

  const toggleSession = (sessionId: string) => {
    setExpandedSession(expandedSession === sessionId ? '' : sessionId);
  };

  return (
    <main className="max-w-6xl min-w-4xl mx-auto px-6 py-12">
      {/* Session Statistics */}
      <div className="mb-16">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8 text-center">
          Session Statistics
        </p>
        <div className="grid grid-cols-2 gap-12 font-mono">
          <div className="text-center">
            <h3 className="text-6xl font-bold mb-2 text-foreground">{totalFocusTime}</h3>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Total Focus Time (Hrs)
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-6xl font-bold mb-2 text-foreground">{tasksCompleted}</h3>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Tasks Completed
            </p>
          </div>
        </div>
      </div>

      {/* Session History */}
      <div className="bg-card border border-border rounded-lg p-8">
        {/* Header with Filters */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <h2 className="font-mono text-sm uppercase tracking-widest font-bold text-foreground">
            Session History
          </h2>
          <div className="flex gap-4 text-xs font-mono uppercase text-muted-foreground">
            <button
              onClick={() => setFilterTab('all')}
              className={`pb-1 transition-colors ${filterTab === 'all'
                ? 'text-accent border-b border-accent'
                : 'hover:text-foreground border-b border-transparent'
                }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterTab('week')}
              className={`pb-1 transition-colors ${filterTab === 'week'
                ? 'text-accent border-b border-accent'
                : 'hover:text-foreground border-b border-transparent'
                }`}
            >
              Week
            </button>
            <button
              onClick={() => setFilterTab('month')}
              className={`pb-1 transition-colors ${filterTab === 'month'
                ? 'text-accent border-b border-accent'
                : 'hover:text-foreground border-b border-transparent'
                }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-8">
          {sessions.map((session, index) => (
            <div key={session.id}>
              <button
                onClick={() => toggleSession(session.id)}
                className={`w-full flex items-center justify-between group transition-colors ${index > 0 ? 'cursor-pointer hover:bg-secondary hover:bg-opacity-20 -mx-4 px-4 py-2' : ''
                  }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-mono uppercase text-muted-foreground">
                      {session.date}
                    </span>
                    <span className="text-xl font-mono font-bold text-foreground">
                      {session.day}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-border mx-2" />
                  <div>
                    <h4 className="font-mono text-sm uppercase font-bold text-foreground group-hover:text-accent transition-colors text-start">
                      {session.sessionName}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-xs font-mono uppercase text-muted-foreground tracking-wider">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.duration}
                      </span>
                      <span>•</span>
                      <span>{session.sessionTime}</span>
                      {index > 0 && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-accent" />
                            {session.tasksCount} Task{session.tasksCount !== 1 ? 's' : ''}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {index === 0 ? (
                  expandedSession === session.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )
                ) : (
                  expandedSession === session.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )
                )}
              </button>

              {/* Expanded Content */}
              {expandedSession === session.id && session.completedTasks.length > 0 && (
                <div className="space-y-4 pl-4 border-l border-border ml-14 mt-4">
                  <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    Completed Tasks
                  </p>
                  {session.completedTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                          {task.title}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground shrink-0 ml-3">
                        {task.time}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <button className="w-full mt-12 py-3 border border-border hover:border-muted-foreground text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all">
          Load More History
        </button>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center opacity-50 hover:opacity-100 transition-opacity">
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Logged in as designer@system.local
        </p>
      </div>
    </main>
  );
}

