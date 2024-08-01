export interface iEvent {
    id: number;
    title: string;
    description: string;
    start_at: string;
    finish_at: string;
    all_day: boolean;
    created_at: string;
    updated_at?: string;
    deleted_at?: string | null;
}
