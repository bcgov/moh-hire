export const emailBodyWithUnsubscribeLink = (body: string, unsubUrl: string) => {
  return `
     <div>
       ${body}
       <br/>
       <footer style="text-align: center;">
         <a href='${unsubUrl}'>Unsubscribe</a>
       </footer>
     </div>
   `;
};

export const updateSubmissionLink = (updateUrl: string, linkText: string) =>
  `<a href='${updateUrl}'>${linkText}</a>`;
