export interface iEvent {
    id: number;
    title: string;
    description: string;
    start_at: string | null;
    finish_at: string | null;
    all_day: boolean;
    created_at: string;
    updated_at?: string;
    deleted_at?: string | null;
}
