import { createBrowserClient } from '@supabase/ssr';
import { User } from '@supabase/supabase-js';

// Research-based mock database pre-populated with standard K-12 educational entities
const MOCK_DATA: Record<string, any[]> = {
  users: [
    { id: 'e1000000-0000-0000-0000-000000000000', email: 'edna.krabappel@springfield.edu', first_name: 'Edna', last_name: 'Krabappel', district_id: 'd1111111-1111-1111-1111-111111111111', school_id: 'e2222222-2222-2222-2222-222222222222' },
    { id: 'e5555555-5555-5555-5555-555555555555', email: 'semihagnyldz@gmail.com', first_name: 'Semih', last_name: 'Yildiz', district_id: 'd1111111-1111-1111-1111-111111111111', school_id: 'e2222222-2222-2222-2222-222222222222' },
    { id: 'a2000000-0000-0000-0000-000000000000', email: 'principal.skinner@springfield.edu', first_name: 'Seymour', last_name: 'Skinner', district_id: 'd1111111-1111-1111-1111-111111111111', school_id: 'e2222222-2222-2222-2222-222222222222' },
    { id: 'a1000000-0000-0000-0000-000000000000', email: 'admin@springfield.edu', first_name: 'Gary', last_name: 'Superintendent', district_id: 'd1111111-1111-1111-1111-111111111111', school_id: null }
  ],
  user_roles: [
    { user_id: 'e1000000-0000-0000-0000-000000000000', role: 'teacher' },
    { user_id: 'e5555555-5555-5555-5555-555555555555', role: 'teacher' },
    { user_id: 'a2000000-0000-0000-0000-000000000000', role: 'principal' },
    { user_id: 'a1000000-0000-0000-0000-000000000000', role: 'district_admin' }
  ],
  districts: [
    { id: 'd1111111-1111-1111-1111-111111111111', name: 'Springfield School District' }
  ],
  schools: [
    { id: 'e2222222-2222-2222-2222-222222222222', district_id: 'd1111111-1111-1111-1111-111111111111', name: 'Springfield High School' },
    { id: 'e3333333-3333-3333-3333-333333333333', district_id: 'd1111111-1111-1111-1111-111111111111', name: 'Shelbyville Elementary' }
  ],
  classes: [
    { id: 'c0000001-0000-0000-0000-000000000000', school_id: 'e2222222-2222-2222-2222-222222222222', teacher_id: 'e5555555-5555-5555-5555-555555555555', name: '4th Grade English', grade_level: 'Grade 4' },
    { id: 'c0000002-0000-0000-0000-000000000000', school_id: 'e2222222-2222-2222-2222-222222222222', teacher_id: 'e2000000-0000-0000-0000-000000000000', name: 'High School Band', grade_level: 'Grade 9' }
  ],
  students: [
    { id: 'a000001-0000-0000-0000-000000000000', school_id: 'e2222222-2222-2222-2222-222222222222', first_name: 'Bart', last_name: 'Simpson' },
    { id: 'a000002-0000-0000-0000-000000000000', school_id: 'e2222222-2222-2222-2222-222222222222', first_name: 'Lisa', last_name: 'Simpson' },
    { id: 'a000003-0000-0000-0000-000000000000', school_id: 'e2222222-2222-2222-2222-222222222222', first_name: 'Milhouse', last_name: 'Van Houten' },
    { id: 'a000004-0000-0000-0000-000000000000', school_id: 'e2222222-2222-2222-2222-222222222222', first_name: 'Nelson', last_name: 'Muntz' },
    { id: 'a000005-0000-0000-0000-000000000000', school_id: 'e2222222-2222-2222-2222-222222222222', first_name: 'Martin', last_name: 'Prince' }
  ],
  skills: [
    { id: 'sk-1', name: 'Fraction Identification' },
    { id: 'sk-2', name: 'Reading Comprehension' }
  ],
  student_skills: [
    { id: 'ss-1', student_id: 'a000001-0000-0000-0000-000000000000', skill_id: 'sk-1', mastery: 0.6, last_assessed: '2026-08-12' }
  ],
  standards: [
    { code: 'NC.3.NF.2', name: 'Represent thirds on a number line', subject: 'Mathematics' },
    { code: 'NC.3.RL.1', name: 'Ask and answer questions to demonstrate understanding', subject: 'ELA' }
  ],
  plc_teams: [
    { id: 'ea111111-1111-1111-1111-111111111111', school_id: 'e2222222-2222-2222-2222-222222222222', name: 'Grade 3 ELA PLC' }
  ],
  plc_team_members: [
    { team_id: 'ea111111-1111-1111-1111-111111111111', user_id: 'e1000000-0000-0000-0000-000000000000', is_leader: true, team: { id: 'ea111111-1111-1111-1111-111111111111', name: 'Grade 3 ELA PLC' } },
    { team_id: 'ea111111-1111-1111-1111-111111111111', user_id: 'e5555555-5555-5555-5555-555555555555', is_leader: true, team: { id: 'ea111111-1111-1111-1111-111111111111', name: 'Grade 3 ELA PLC' } }
  ],
  plc_meetings: [
    { id: 'm-1', team_id: 'ea111111-1111-1111-1111-111111111111', date: '2026-08-10', objective: 'Analyze NC.3.RL.1 learning metrics', standard: 'NC.3.RL.1', learning_target: 'Identify character motivations', success_criteria: 'Write a short summary paragraph', status: 'completed', team: { name: 'Grade 3 ELA PLC' } },
    { id: 'm-2', team_id: 'ea111111-1111-1111-1111-111111111111', date: '2026-08-20', objective: 'Plan next geometry unit', standard: 'NC.3.G.1', learning_target: 'Categorize quadrilaterals', success_criteria: 'Define 4-sided shapes', status: 'draft', team: { name: 'Grade 3 ELA PLC' } }
  ],
  plc_action_items: [
    { id: 'act-1', owner_id: 'e1000000-0000-0000-0000-000000000000', action: 'Create Frayer Model templates for lesson vocabulary', deadline: '2026-08-16', status: 'pending', evidence_to_collect: 'Student graphic organizers', meeting_id: 'm-1', meeting: { standard: 'NC.3.RL.1' } },
    { id: 'act-2', owner_id: 'e5555555-5555-5555-5555-555555555555', action: 'Create Frayer Model templates for lesson vocabulary', deadline: '2026-08-16', status: 'pending', evidence_to_collect: 'Student graphic organizers', meeting_id: 'm-1', meeting: { standard: 'NC.3.RL.1' } }
  ],
  responsive_cycles: [
    { id: 'rc-1', teacher_id: 'e1000000-0000-0000-0000-000000000000', subject: 'Mathematics', grade_level: '3rd Grade', standard: 'NC.3.NF.2', lesson_unit: 'Fractions on a Number Line', learning_target: 'Partition a number line into equal intervals and represent thirds', success_criteria: 'Represent thirds on a number line', status: 'active', created_at: '2026-08-11', updated_at: '2026-08-13' },
    { id: 'rc-2', teacher_id: 'e5555555-5555-5555-5555-555555555555', subject: 'Mathematics', grade_level: '3rd Grade', standard: 'NC.3.NF.2', lesson_unit: 'Fractions on a Number Line', learning_target: 'Partition a number line into equal intervals and represent thirds', success_criteria: 'Represent thirds on a number line', status: 'active', created_at: '2026-08-11', updated_at: '2026-08-13' }
  ],
  responsive_student_groups: [
    { id: 'rg-1', cycle_id: 'rc-1', name: 'Strategic Guided Small Groups (Concrete CRA)', notes: 'Requires extra tactile fraction tiles practice' },
    { id: 'rg-2', cycle_id: 'rc-2', name: 'Strategic Guided Small Groups (Concrete CRA)', notes: 'Requires extra tactile fraction tiles practice' }
  ],
  responsive_group_members: [
    { group_id: 'rg-1', student_id: 'a000001-0000-0000-0000-000000000000', performance_level: 'developing' },
    { group_id: 'rg-2', student_id: 'a000001-0000-0000-0000-000000000000', performance_level: 'developing' }
  ],
  responsive_strategies: [
    { group_id: 'rg-1', strategy_name: 'Concrete-Representational-Abstract (CRA) Sequence', responsible_teacher_id: 'e1000000-0000-0000-0000-000000000000', start_date: '2026-08-12', followup_date: '2026-08-19', status: 'active', notes: 'Using 3D printed fraction blocks' },
    { group_id: 'rg-2', strategy_name: 'Concrete-Representational-Abstract (CRA) Sequence', responsible_teacher_id: 'e5555555-5555-5555-5555-555555555555', start_date: '2026-08-12', followup_date: '2026-08-19', status: 'active', notes: 'Using 3D printed fraction blocks' }
  ],
  responsive_student_paths: [
    { id: 'path-1', student_id: 'a000001-0000-0000-0000-000000000000', cycle_id: 'rc-1', status: 'active', notes: 'Needs scaffolding' },
    { id: 'path-2', student_id: 'a000001-0000-0000-0000-000000000000', cycle_id: 'rc-2', status: 'active', notes: 'Needs scaffolding' }
  ],
  responsive_progress_checks: [
    { id: 'pc-1', student_id: 'a000001-0000-0000-0000-000000000000', cycle_id: 'rc-1', score: 75, notes: 'Improved from 40%' },
    { id: 'pc-2', student_id: 'a000001-0000-0000-0000-000000000000', cycle_id: 'rc-2', score: 75, notes: 'Improved from 40%' }
  ],
  responsive_strategies_library: [
    { id: 'strat-lib-1', name: 'Concrete-Representational-Abstract (CRA) Sequence', description: 'Multi-sensory math scaffolding sequence.', evidence_base: 'What Works Clearinghouse (WWC) Strong Evidence' }
  ]
};

const getTableData = (table: string): any[] => {
  if (typeof window === 'undefined') return MOCK_DATA[table] || [];
  const sessionStore = sessionStorage.getItem(`MOCK_${table}`);
  if (sessionStore) return JSON.parse(sessionStore);
  
  const initial = MOCK_DATA[table] || [];
  sessionStorage.setItem(`MOCK_${table}`, JSON.stringify(initial));
  return initial;
};

const saveTableData = (table: string, data: any[]) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(`MOCK_${table}`, JSON.stringify(data));
};

class MockQueryResolved {
  constructor(private data: any) {}
  then(onfulfilled: (value: any) => void, onrejected?: (reason: any) => void) {
    return Promise.resolve({ data: this.data, error: null }).then(onfulfilled, onrejected);
  }
}

class MockQueryPendingUpdate {
  private filters: Array<(item: any) => boolean> = [];
  constructor(private table: string, private updateData: any) {}

  eq(col: string, val: any) {
    this.filters.push(item => item[col] === val);
    return this;
  }
  in(col: string, vals: any[]) {
    this.filters.push(item => vals.includes(item[col]));
    return this;
  }

  then(onfulfilled: (value: any) => void, onrejected?: (reason: any) => void) {
    const tableData = getTableData(this.table);
    const updated: any[] = [];
    const newTableData = tableData.map(item => {
      let matches = true;
      for (const filter of this.filters) {
        if (!filter(item)) matches = false;
      }
      if (matches) {
        const updatedItem = { ...item, ...this.updateData, updated_at: new Date().toISOString() };
        updated.push(updatedItem);
        return updatedItem;
      }
      return item;
    });
    saveTableData(this.table, newTableData);
    return Promise.resolve({ data: updated, error: null }).then(onfulfilled, onrejected);
  }
}

class MockQueryPendingDelete {
  private filters: Array<(item: any) => boolean> = [];
  constructor(private table: string) {}

  eq(col: string, val: any) {
    this.filters.push(item => item[col] === val);
    return this;
  }
  in(col: string, vals: any[]) {
    this.filters.push(item => vals.includes(item[col]));
    return this;
  }

  then(onfulfilled: (value: any) => void, onrejected?: (reason: any) => void) {
    const tableData = getTableData(this.table);
    const newTableData = tableData.filter(item => {
      let matches = true;
      for (const filter of this.filters) {
        if (!filter(item)) matches = false;
      }
      return !matches;
    });
    saveTableData(this.table, newTableData);
    return Promise.resolve({ data: null, error: null }).then(onfulfilled, onrejected);
  }
}

class MockQuery {
  private filters: Array<(item: any) => boolean> = [];
  private orderField: string | null = null;
  private orderAscending = true;
  private isSingle = false;

  constructor(private table: string) {}

  select(fields?: string) {
    return this;
  }

  insert(data: any) {
    const tableData = getTableData(this.table);
    const records = Array.isArray(data) ? data : [data];
    const inserted: any[] = [];
    for (const record of records) {
      const newRecord = { 
        id: record.id || `mock-${this.table}-${Math.random().toString(36).substr(2, 9)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...record 
      };
      tableData.push(newRecord);
      inserted.push(newRecord);
    }
    saveTableData(this.table, tableData);
    this.isSingle = !Array.isArray(data);
    const queryResult = this.isSingle ? inserted[0] : inserted;
    return new MockQueryResolved(queryResult);
  }

  update(data: any) {
    return new MockQueryPendingUpdate(this.table, data);
  }

  delete() {
    return new MockQueryPendingDelete(this.table);
  }

  eq(col: string, val: any) {
    this.filters.push(item => item[col] === val);
    return this;
  }

  neq(col: string, val: any) {
    this.filters.push(item => item[col] !== val);
    return this;
  }

  in(col: string, vals: any[]) {
    this.filters.push(item => vals.includes(item[col]));
    return this;
  }

  order(col: string, { ascending = true } = {}) {
    this.orderField = col;
    this.orderAscending = ascending;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  limit(n: number) {
    return this;
  }

  private execute() {
    let list = getTableData(this.table);
    for (const filter of this.filters) {
      list = list.filter(filter);
    }
    if (this.orderField) {
      list.sort((a, b) => {
        const valA = a[this.orderField!];
        const valB = b[this.orderField!];
        if (valA < valB) return this.orderAscending ? -1 : 1;
        if (valA > valB) return this.orderAscending ? 1 : -1;
        return 0;
      });
    }
    if (this.isSingle) {
      return list[0] || null;
    }
    return list;
  }

  then(onfulfilled: (value: any) => void, onrejected?: (reason: any) => void) {
    return Promise.resolve({ data: this.execute(), error: null }).then(onfulfilled, onrejected);
  }
}

let authListeners: Array<any> = [];

const mockAuth = {
  async getSession() {
    if (typeof window === 'undefined') return { data: { session: null }, error: null };
    const userJson = sessionStorage.getItem('MOCK_AUTH_USER');
    if (!userJson) return { data: { session: null }, error: null };
    const user = JSON.parse(userJson);
    return { data: { session: { user, access_token: 'mock-token' } }, error: null };
  },
  async getUser() {
    if (typeof window === 'undefined') return { data: { user: null }, error: null };
    const userJson = sessionStorage.getItem('MOCK_AUTH_USER');
    if (!userJson) return { data: { user: null }, error: null };
    const user = JSON.parse(userJson);
    return { data: { user }, error: null };
  },
  async signInWithPassword({ email, password }: any) {
    const users = MOCK_DATA.users;
    const matched = users.find(u => u.email === email);
    if (!matched) {
      return { data: { user: null, session: null }, error: { message: 'Invalid email or password' } };
    }
    const userObj = { id: matched.id, email: matched.email };
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('MOCK_AUTH_USER', JSON.stringify(userObj));
    }
    const session = { user: userObj, access_token: 'mock-token' };
    authListeners.forEach(listener => listener('SIGNED_IN', session));
    return { data: { user: userObj, session }, error: null };
  },
  async signOut() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('MOCK_AUTH_USER');
    }
    authListeners.forEach(listener => listener('SIGNED_OUT', null));
    return { error: null };
  },
  onAuthStateChange(callback: any) {
    authListeners.push(callback);
    this.getSession().then(({ data: { session } }) => {
      callback(session ? 'SIGNED_IN' : 'SIGNED_OUT', session);
    });
    return {
      data: {
        subscription: {
          unsubscribe() {
            authListeners = authListeners.filter(l => l !== callback);
          }
        }
      }
    };
  }
};

const createMockClient = () => {
  return {
    from(table: string) {
      return new MockQuery(table);
    },
    auth: mockAuth
  } as any;
};

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  if (url.includes('wjdowtmrbomhejcunajc.supabase.co') || !url) {
    return createMockClient();
  }
  return createBrowserClient(
    url,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  );
};
