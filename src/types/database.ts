export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      approval_events: {
        Row: {
          action: string
          created_at: string
          id: string
          note: string | null
          portfolio_version_id: string | null
          project_profile_id: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          note?: string | null
          portfolio_version_id?: string | null
          project_profile_id?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          note?: string | null
          portfolio_version_id?: string | null
          project_profile_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_events_portfolio_version_id_user_id_fkey"
            columns: ["portfolio_version_id", "user_id"]
            isOneToOne: false
            referencedRelation: "portfolio_versions"
            referencedColumns: ["id", "user_id"]
          },
          {
            foreignKeyName: "approval_events_project_profile_id_user_id_fkey"
            columns: ["project_profile_id", "user_id"]
            isOneToOne: false
            referencedRelation: "project_profiles"
            referencedColumns: ["id", "user_id"]
          },
        ]
      }
      evidence_items: {
        Row: {
          content_hash: string
          created_at: string
          evidence_type: string
          excerpt: string | null
          id: string
          repository_id: string
          snapshot_id: string
          source_path: string | null
          source_url: string | null
          structured_value: Json
          user_id: string
        }
        Insert: {
          content_hash: string
          created_at?: string
          evidence_type: string
          excerpt?: string | null
          id?: string
          repository_id: string
          snapshot_id: string
          source_path?: string | null
          source_url?: string | null
          structured_value?: Json
          user_id: string
        }
        Update: {
          content_hash?: string
          created_at?: string
          evidence_type?: string
          excerpt?: string | null
          id?: string
          repository_id?: string
          snapshot_id?: string
          source_path?: string | null
          source_url?: string | null
          structured_value?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_items_repository_id_user_id_fkey"
            columns: ["repository_id", "user_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id", "user_id"]
          },
          {
            foreignKeyName: "evidence_items_snapshot_id_user_id_repository_id_fkey"
            columns: ["snapshot_id", "user_id", "repository_id"]
            isOneToOne: false
            referencedRelation: "repository_snapshots"
            referencedColumns: ["id", "user_id", "repository_id"]
          },
        ]
      }
      evolution_runs: {
        Row: {
          completed_at: string | null
          created_at: string
          failure_code: string | null
          id: string
          idempotency_key: string
          prompt_version: string | null
          run_type: string
          source_revision: string | null
          started_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          failure_code?: string | null
          id?: string
          idempotency_key: string
          prompt_version?: string | null
          run_type: string
          source_revision?: string | null
          started_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          failure_code?: string | null
          id?: string
          idempotency_key?: string
          prompt_version?: string | null
          run_type?: string
          source_revision?: string | null
          started_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      github_connections: {
        Row: {
          avatar_url: string | null
          connected_at: string
          created_at: string
          disconnected_at: string | null
          github_account_id: number
          github_login: string
          id: string
          installation_id: number
          installation_permissions: Json
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          connected_at?: string
          created_at?: string
          disconnected_at?: string | null
          github_account_id: number
          github_login: string
          id?: string
          installation_id: number
          installation_permissions?: Json
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          connected_at?: string
          created_at?: string
          disconnected_at?: string | null
          github_account_id?: number
          github_login?: string
          id?: string
          installation_id?: number
          installation_permissions?: Json
          user_id?: string
        }
        Relationships: []
      }
      portfolio_versions: {
        Row: {
          approved_at: string | null
          based_on_version_id: string | null
          configuration: Json
          created_at: string
          evolution_run_id: string | null
          id: string
          portfolio_id: string
          published_at: string | null
          status: string
          user_id: string
          version_number: number
        }
        Insert: {
          approved_at?: string | null
          based_on_version_id?: string | null
          configuration: Json
          created_at?: string
          evolution_run_id?: string | null
          id?: string
          portfolio_id: string
          published_at?: string | null
          status?: string
          user_id: string
          version_number: number
        }
        Update: {
          approved_at?: string | null
          based_on_version_id?: string | null
          configuration?: Json
          created_at?: string
          evolution_run_id?: string | null
          id?: string
          portfolio_id?: string
          published_at?: string | null
          status?: string
          user_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_versions_based_on_version_id_user_id_fkey"
            columns: ["based_on_version_id", "user_id"]
            isOneToOne: false
            referencedRelation: "portfolio_versions"
            referencedColumns: ["id", "user_id"]
          },
          {
            foreignKeyName: "portfolio_versions_evolution_run_id_user_id_fkey"
            columns: ["evolution_run_id", "user_id"]
            isOneToOne: false
            referencedRelation: "evolution_runs"
            referencedColumns: ["id", "user_id"]
          },
          {
            foreignKeyName: "portfolio_versions_portfolio_id_user_id_fkey"
            columns: ["portfolio_id", "user_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id", "user_id"]
          },
        ]
      }
      portfolios: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          slug: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          slug: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          slug?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      project_profile_evidence: {
        Row: {
          created_at: string
          evidence_item_id: string
          profile_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          evidence_item_id: string
          profile_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          evidence_item_id?: string
          profile_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_profile_evidence_evidence_item_id_user_id_fkey"
            columns: ["evidence_item_id", "user_id"]
            isOneToOne: false
            referencedRelation: "evidence_items"
            referencedColumns: ["id", "user_id"]
          },
          {
            foreignKeyName: "project_profile_evidence_profile_id_user_id_fkey"
            columns: ["profile_id", "user_id"]
            isOneToOne: false
            referencedRelation: "project_profiles"
            referencedColumns: ["id", "user_id"]
          },
        ]
      }
      project_profiles: {
        Row: {
          claims: Json
          created_at: string
          highlights: Json
          id: string
          model_id: string | null
          model_provider: string | null
          repository_id: string
          reviewed_at: string | null
          role_description: string | null
          schema_version: string
          snapshot_id: string
          status: string
          summary: string
          technologies: Json
          title: string
          user_id: string
          version_number: number
        }
        Insert: {
          claims?: Json
          created_at?: string
          highlights?: Json
          id?: string
          model_id?: string | null
          model_provider?: string | null
          repository_id: string
          reviewed_at?: string | null
          role_description?: string | null
          schema_version: string
          snapshot_id: string
          status?: string
          summary: string
          technologies?: Json
          title: string
          user_id: string
          version_number: number
        }
        Update: {
          claims?: Json
          created_at?: string
          highlights?: Json
          id?: string
          model_id?: string | null
          model_provider?: string | null
          repository_id?: string
          reviewed_at?: string | null
          role_description?: string | null
          schema_version?: string
          snapshot_id?: string
          status?: string
          summary?: string
          technologies?: Json
          title?: string
          user_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_profiles_repository_id_user_id_fkey"
            columns: ["repository_id", "user_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id", "user_id"]
          },
          {
            foreignKeyName: "project_profiles_snapshot_id_user_id_repository_id_fkey"
            columns: ["snapshot_id", "user_id", "repository_id"]
            isOneToOne: false
            referencedRelation: "repository_snapshots"
            referencedColumns: ["id", "user_id", "repository_id"]
          },
        ]
      }
      repositories: {
        Row: {
          connection_id: string
          created_at: string
          default_branch: string | null
          description: string | null
          full_name: string
          github_repo_id: number
          html_url: string
          id: string
          is_selected: boolean
          last_synced_at: string | null
          name: string
          owner_login: string
          sync_status: string
          updated_at: string
          user_id: string
          visibility: string
        }
        Insert: {
          connection_id: string
          created_at?: string
          default_branch?: string | null
          description?: string | null
          full_name: string
          github_repo_id: number
          html_url: string
          id?: string
          is_selected?: boolean
          last_synced_at?: string | null
          name: string
          owner_login: string
          sync_status?: string
          updated_at?: string
          user_id: string
          visibility?: string
        }
        Update: {
          connection_id?: string
          created_at?: string
          default_branch?: string | null
          description?: string | null
          full_name?: string
          github_repo_id?: number
          html_url?: string
          id?: string
          is_selected?: boolean
          last_synced_at?: string | null
          name?: string
          owner_login?: string
          sync_status?: string
          updated_at?: string
          user_id?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "repositories_connection_id_user_id_fkey"
            columns: ["connection_id", "user_id"]
            isOneToOne: false
            referencedRelation: "github_connections"
            referencedColumns: ["id", "user_id"]
          },
        ]
      }
      repository_snapshots: {
        Row: {
          branch_name: string | null
          captured_at: string
          commit_sha: string
          content_digest: string
          id: string
          readme_excerpt: string | null
          repository_id: string
          repository_metadata: Json
          user_id: string
        }
        Insert: {
          branch_name?: string | null
          captured_at?: string
          commit_sha: string
          content_digest: string
          id?: string
          readme_excerpt?: string | null
          repository_id: string
          repository_metadata?: Json
          user_id: string
        }
        Update: {
          branch_name?: string | null
          captured_at?: string
          commit_sha?: string
          content_digest?: string
          id?: string
          readme_excerpt?: string | null
          repository_id?: string
          repository_metadata?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "repository_snapshots_repository_id_user_id_fkey"
            columns: ["repository_id", "user_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id", "user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
