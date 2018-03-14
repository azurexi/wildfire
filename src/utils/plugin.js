// TODO: Finish beforeEvent
export const beforeEvent = (eventName, data, bus) => {
  // const events = bus.events[eventName] || [];
  // const newBus = bus.filteredBus(eventName);
  // TODO:
  // eventFn may be a asynchronous function,
  // then it won't stop while shouldContinue is false.
  // So make sure eventFn be a synchro function.
  // return events.map((eventFn) => eventFn(newBus, data)).reduce((a, b) => a && b, true);
  console.log('todo');
  return true;
};

// TODO: Finish afterEvent
export const afterEvent = (eventName, data, bus) => {
  // const events = bus.events[eventName] || [];
  // const newBus = bus.filteredBus(eventName);
  // events.forEach((eventFn) => {
  //   eventFn(newBus, data);
  // });
};

class WfPluginTranslationManager {
  constructor() {
    this.translations = {};
  }

  add({ pluginId, translation }) {
    Object.assign(this.translations, { [pluginId]: translation });
  }

  remove({ pluginId }) {
    if (this.translations[pluginId]) {
      delete this.translations[pluginId];
    }
  }

  t(locale) {
    return (pluginId) => (key) => {
      let translation;
      if (!this.translations[pluginId]) {
        return key;
      }
      if (!this.translations[pluginId][locale]) {
        const { fallback } = this.translations[pluginId];
        if (fallback) {
          translation = this.translations[pluginId][fallback];
        } else {
          const availableLocales = Object.keys(this.translations[pluginId]);
          if (availableLocales.length === 0) {
            return key;
          }
          translation = this.translations[pluginId][availableLocales[0]];
        }
      } else {
        translation = this.translations[pluginId][locale];
      }
      return translation[key] || key;
    };
  }
}

export const PTM = new WfPluginTranslationManager();
