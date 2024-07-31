export interface iEvent {
    title: string;
    description: string;
    start_at: Date;
    finish_at: Date;
    allDay: boolean;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    id?: number;
}
