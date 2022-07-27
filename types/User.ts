const ADMIN_ROLE = "admin";
export class User {
  data: any;
  roles: Set<string>;
  abilities: Set<string>;

  constructor(data: any) {
    this.data = data;
    this.roles = new Set(data?.ruoli.map((ruolo: any) => ruolo.nomeRuolo));
    this.abilities = new Set();
  }

  fullname() {
    return this.data?.nome + " " + this.data?.cognome;
  }

  roleIS(role: string) {
    return this.data && this.roles && this.roles.has(role);
  }

  isLoggedIn() {
    return this.data && this.data?.id > 0;
  }

  canCreate(type: string) {
    return this.roleIS(ADMIN_ROLE) || (this.data && this.abilities.has(type + "-create"));
  }

  canDelete(type: string) {
    return this.roleIS(ADMIN_ROLE) || (this.data && this.abilities.has(type + "-delete"));
  }

  canEdit(type: string) {
    return this.roleIS(ADMIN_ROLE) || (this.data && this.abilities.has(type + "-edit"));
  }

  canPublish(type: string) {
    return this.roleIS(ADMIN_ROLE) || (this.data && this.abilities.has(type + "-publish"));
  }

  canWrite(type: string) {
    return (
      this.roleIS(ADMIN_ROLE) ||
      (this.canCreate(type) && this.canDelete(type) && this.canEdit(type) && this.canPublish(type))
    );
  }

  canRead(type: string) {
    return this.roleIS(ADMIN_ROLE); // || (this.data && this.abilities.has( type + "-view"));
  }
}
