import Service from '@ember/service';
import hljs from 'highlight.js';

export default class HljsService extends Service {
  setup() {
    // this.#configure();
  }

  registeredLanguages = [
    'css',
    'elixir',
    'html',
    'javascript',
    'json',
    'markdown',
    'php',
    'python',
    'ruby',
    'rust',
    'shell',
    'sql',
    'typescript'
  ];

  // Configure highlight.js on init
  // async #configure() {
  //   this.registeredLanguages.forEach(async (lang) => {
  //     const module =
  //       // @ts-expect-error sdfa
  //       (await load(`${hljsBaseUrl}/languages/${lang}.min.js`))?.default;

  //     if (module) {
  //       this.hljs.registerLanguage(lang, module);
  //     }
  //   });
  // }

  highlightAuto(code: string) {
    return hljs.highlightAuto(code);
  }
}
