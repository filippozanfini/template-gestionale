export class User {
  data: any;
  abilities: Set<string>;

  constructor( data: any ){
    this.data = data;
    this.abilities = new Set( Object.keys(data?.abilities|| {} ) );
  }

  fullname () {
    return this.data?.first_name + " " + this.data?.last_name;
  }

  roleIS( role: string ){
    return this.data && this.data.roles && this.data.roles[role];
  }

  isLoggedIn () {
    return this.data && this.data?.active === 1;
  }

  canCreate ( type: string ) {
    return this.roleIS("administrator") || (this.data && this.abilities.has( type + "-create") );
  }
  canDelete ( type: string ) {
    return this.roleIS("administrator") || (this.data && this.abilities.has( type + "-delete"));
  }
  canEdit ( type: string ) {
    return this.roleIS("administrator") || (this.data && this.abilities.has( type + "-edit"));
  }
  canPublish( type: string ) {
    return this.roleIS("administrator") || (this.data && this.abilities.has( type + "-publish"));
  }
  canWrite( type: string ) {
    return this.roleIS("administrator") || (this.canCreate(type)  &&
    this.canDelete(type) &&
    this.canEdit(type) &&
    this.canPublish(type));
  }
  canRead( type: string ) {
    return this.roleIS("administrator") || (this.data && this.abilities.has( type + "-view"));
  }

}