import $ from '../../../node_modules/jquery/dist/jquery';
import i18next from '@/js/vendors/i18next';
import i18nextBrowserLanguageDetector from '@/js/vendors/i18nextBrowserDetector';
import jqueryI18next from '@/js/vendors/jquery-i18next';

window.jQuery = $;
window.$ = $;
export const script = () => {
    (function($) {  
      console.log($);
      console.log("jquery rodando");
      console.log("testando");
                  
    })($);
};