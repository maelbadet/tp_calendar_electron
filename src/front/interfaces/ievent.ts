export interface iEvent {
    id?: number;
    title: string;
    description: string;
    all_day: boolean;
    start_at?: string;
    finish_at?: string;
    created_at: String;
    updated_at?: Date;
    deleted_at?: Date;
}
