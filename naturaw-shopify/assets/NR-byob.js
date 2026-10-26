if (!customElements.get('nr-byob-modal')) {
  customElements.define(
    'nr-byob-modal',
    class NRByobModal extends HTMLElement {
      connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        this.config = JSON.parse(this.querySelector('[data-nr-byob-config]').textContent);
        this.dialog = this.querySelector('.nr-byob__dialog');
        this.flavours = Array.from(this.querySelectorAll('[data-nr-byob-flavour]')).map((el) => ({
          el,
          variantId: el.dataset.nrByobFlavour,
          title: el.dataset.title,
          image: el.dataset.image,
          qty: 0,
        }));
        this.size = this.config.sizes.length ? this.config.sizes[this.config.sizes.length - 1].size : 0;
        this.gift = false;

        this.querySelectorAll('[data-nr-byob-close]').forEach((el) =>
          el.addEventListener('click', () => this.close())
        );
        this.addEventListener('keyup', (event) => {
          if (event.code === 'Escape') this.close();
        });

        this.querySelectorAll('[data-nr-byob-size]').forEach((btn) =>
          btn.addEventListener('click', () => this.setSize(Number(btn.dataset.nrByobSize)))
        );

        this.flavours.forEach((flavour) => {
          flavour.el.querySelectorAll('[data-nr-byob-step]').forEach((btn) =>
            btn.addEventListener('click', () => this.step(flavour, Number(btn.dataset.nrByobStep)))
          );
        });

        this.giftInput = this.querySelector('[data-nr-byob-gift]');
        this.giftNote = this.querySelector('[data-nr-byob-gift-note]');
        this.giftMessage = this.querySelector('[data-nr-byob-gift-message]');
        this.giftInput.addEventListener('change', () => {
          this.gift = this.giftInput.checked;
          this.giftNote.hidden = !this.gift;
          this.render();
        });

        this.submitButton = this.querySelector('[data-nr-byob-submit]');
        this.submitButton.addEventListener('click', () => this.addToCart());

        document.addEventListener('click', (event) => {
          const trigger = event.target.closest('[data-nr-byob-open]');
          if (!trigger) return;
          event.preventDefault();
          this.open(trigger);
        });

        this.render();
      }

      open(trigger) {
        this.trigger = trigger;
        this.hidden = false;
        document.body.classList.add('overflow-hidden');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => this.classList.add('is-open'));
        });
        if (typeof trapFocus === 'function') trapFocus(this.dialog, this.dialog);
        else this.dialog.focus();
      }

      close() {
        if (this.hidden) return;
        this.classList.remove('is-open');
        document.body.classList.remove('overflow-hidden');
        if (typeof removeTrapFocus === 'function') removeTrapFocus(this.trigger);
        window.setTimeout(() => {
          this.hidden = true;
        }, 300);
      }

      get selectedCount() {
        return this.flavours.reduce((sum, f) => sum + f.qty, 0);
      }

      setSize(size) {
        this.size = size;
        let overflow = this.selectedCount - size;
        for (let i = this.flavours.length - 1; i >= 0 && overflow > 0; i--) {
          const take = Math.min(this.flavours[i].qty, overflow);
          this.flavours[i].qty -= take;
          overflow -= take;
        }
        this.render();
      }

      step(flavour, delta) {
        const next = flavour.qty + delta;
        if (next < 0) return;
        if (delta > 0 && this.selectedCount >= this.size) return;
        flavour.qty = next;
        this.render();
      }

      formatMoney(cents) {
        const format = (this.config.moneyFormat || '{{amount}}').replace(/<[^>]*>/g, '');
        const value = (cents / 100).toFixed(2);
        const [whole, decimals] = value.split('.');
        const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return format.replace(/\{\{\s*(\w+)\s*\}\}/, (_, key) => {
          if (key === 'amount_no_decimals') return withCommas;
          if (key === 'amount_with_comma_separator') return `${whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${decimals}`;
          if (key === 'amount_no_decimals_with_comma_separator') return whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
          return decimals === '00' ? withCommas : `${withCommas}.${decimals}`;
        });
      }

      get sizeConfig() {
        return this.config.sizes.find((s) => s.size === this.size);
      }

      render() {
        const count = this.selectedCount;
        const remaining = Math.max(this.size - count, 0);
        const complete = this.size > 0 && count === this.size;

        this.querySelectorAll('[data-nr-byob-size]').forEach((btn) => {
          const active = Number(btn.dataset.nrByobSize) === this.size;
          btn.classList.toggle('is-selected', active);
          btn.setAttribute('aria-checked', active ? 'true' : 'false');
        });

        this.flavours.forEach((flavour) => {
          flavour.el.querySelector('[data-nr-byob-qty]').textContent = flavour.qty;
          flavour.el.querySelector('[data-nr-byob-step="-1"]').disabled = flavour.qty === 0;
          flavour.el.querySelector('[data-nr-byob-step="1"]').disabled = count >= this.size;
        });

        this.querySelector('[data-nr-byob-remaining]').textContent = complete
          ? 'Box complete'
          : `${remaining} left to pick`;

        const slots = this.querySelector('[data-nr-byob-slots]');
        slots.innerHTML = '';
        const filled = [];
        this.flavours.forEach((f) => {
          for (let i = 0; i < f.qty; i++) filled.push(f);
        });
        for (let i = 0; i < this.size; i++) {
          const li = document.createElement('li');
          li.className = 'nr-byob__slot';
          const flavour = filled[i];
          if (flavour && flavour.image) {
            li.classList.add('is-filled');
            const img = document.createElement('img');
            img.src = flavour.image;
            img.alt = flavour.title;
            img.loading = 'lazy';
            li.appendChild(img);
          } else {
            li.textContent = String(i + 1);
          }
          slots.appendChild(li);
        }

        const sizePrice = this.sizeConfig ? this.sizeConfig.price : 0;
        const giftPrice = this.gift && this.config.gift ? this.config.gift.price : 0;

        const lines = this.querySelector('[data-nr-byob-lines]');
        lines.innerHTML = '';
        const addLine = (label, value) => {
          const li = document.createElement('li');
          li.className = 'nr-byob__line';
          const a = document.createElement('span');
          a.textContent = label;
          const b = document.createElement('span');
          b.textContent = value;
          li.append(a, b);
          lines.appendChild(li);
        };
        this.flavours.filter((f) => f.qty > 0).forEach((f) => addLine(f.title, `× ${f.qty}`));
        addLine(`Box of ${this.size}`, this.formatMoney(sizePrice));
        if (this.gift && this.config.gift) addLine('Gift box with a note', this.formatMoney(giftPrice));

        this.querySelector('[data-nr-byob-total]').textContent = this.formatMoney(sizePrice + giftPrice);

        this.submitButton.disabled = !complete;
        this.querySelector('[data-nr-byob-hint]').textContent = complete
          ? ''
          : count === 0
          ? `Pick ${this.size} flavours to fill your box`
          : `Please select all ${this.size} items to complete your box. ${remaining} more to go.`;
      }

      addToCart() {
        if (this.selectedCount !== this.size || !this.sizeConfig) return;

        const errorEl = this.querySelector('[data-nr-byob-error]');
        errorEl.hidden = true;
        this.submitButton.disabled = true;
        this.submitButton.classList.add('loading');
        const spinner = this.submitButton.querySelector('.loading__spinner');
        if (spinner) spinner.classList.remove('hidden');

        const boxId = `BYOB-${Date.now().toString(36)}`;
        const properties = { 'Box size': `${this.size} packs` };
        this.flavours
          .filter((f) => f.qty > 0)
          .forEach((f) => {
            properties[f.title] = `× ${f.qty}`;
          });
        if (this.gift) {
          properties['Gift box'] = 'Yes';
          const message = this.giftMessage.value.trim();
          if (message) properties['Gift note'] = message;
        }
        properties._box_id = boxId;

        const items = [{ id: Number(this.sizeConfig.variantId), quantity: 1, properties }];
        if (this.gift && this.config.gift) {
          items.push({
            id: Number(this.config.gift.variantId),
            quantity: 1,
            properties: { 'For box': `${this.size} packs`, _box_id: boxId },
          });
        }

        const cart = document.querySelector('cart-drawer');
        const body = { items };
        if (cart && typeof cart.getSectionsToRender === 'function') {
          body.sections = cart.getSectionsToRender().map((s) => s.id);
          body.sections_url = window.location.pathname;
          cart.setActiveElement(this.trigger || document.activeElement);
        }

        fetch(`${window.routes.cart_add_url}.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              errorEl.textContent = response.description || response.message || window.cartStrings.error;
              errorEl.hidden = false;
              return;
            }

            if (typeof publish === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
              publish(PUB_SUB_EVENTS.cartUpdate, { source: 'nr-byob', cartData: response });
            }
            if (window.NRToast) window.NRToast.show('Box added to cart');

            this.close();
            this.reset();

            if (cart && response.sections) {
              cart.classList.remove('is-empty');
              window.setTimeout(() => cart.renderContents(response), 300);
            } else {
              window.location = window.routes.cart_url;
            }
          })
          .catch(() => {
            errorEl.textContent = window.cartStrings.error;
            errorEl.hidden = false;
          })
          .finally(() => {
            this.submitButton.classList.remove('loading');
            if (spinner) spinner.classList.add('hidden');
            this.render();
          });
      }

      reset() {
        this.flavours.forEach((f) => (f.qty = 0));
        this.gift = false;
        this.giftInput.checked = false;
        this.giftNote.hidden = true;
        this.giftMessage.value = '';
      }
    }
  );
}
