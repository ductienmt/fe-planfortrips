class Enterprise {
  addTypeEnterprise(typeEnterprise) {
    sessionStorage.setItem("typeEnterprise", typeEnterprise);
  }

  getTypeEnterprise() {
    return sessionStorage.getItem("typeEnterprise");
  }
}
