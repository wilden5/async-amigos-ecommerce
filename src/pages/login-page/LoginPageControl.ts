class LockState {

  public handleClick = (event: MouseEvent): void => {
    const closeLock = "<i class=\"bx bxs-lock-alt\"></i>";
    const openLock = "<i class=\"bx bxs-lock-open-alt\"></i>";
    const target = event.currentTarget as HTMLElement;
    const passwordInput = target.closest('.input-box')?.querySelector('.input-password') as HTMLInputElement;

    if (passwordInput.value) {
      if (passwordInput.type === 'password') {
        target.innerHTML = openLock;
        passwordInput.type = 'text';
      } else if (passwordInput.type === 'text') {
        target.innerHTML = closeLock;
        passwordInput.type = 'password';
      }
    }
  };

  private asignEventListener(): void {
    const pageHash = window.location.hash.slice(1);
    console.log(pageHash);
    if (pageHash === 'login-page') {

      const b = document.querySelector('.icon-lock')
      console.log(b);
    }
  }

  public init(): void {

    this.asignEventListener();
  }
}

export default LockState;
