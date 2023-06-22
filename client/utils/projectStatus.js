const projectStatuses = [
  {
    value: 'Active',
    image: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="14" r="8" stroke="rgb(209 213 219)" stroke-width="2"/>
<path d="M12 14L12 11" stroke="rgb(209 213 219)" stroke-width="2" stroke-linecap="round"/>
<path d="M17.5 7.5L19 6" stroke="rgb(209 213 219)" stroke-width="2" stroke-linecap="round"/>
<path d="M10.0681 2.37059C10.1821 2.26427 10.4332 2.17033 10.7825 2.10332C11.1318 2.03632 11.5597 2 12 2C12.4403 2 12.8682 2.03632 13.2175 2.10332C13.5668 2.17033 13.8179 2.26427 13.9319 2.37059" stroke="rgb(209 213 219)" stroke-width="2" stroke-linecap="round"/>
</svg>`,
  },
  {
    value: 'Inactive',
    image: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="8" stroke="rgb(209 213 219)" stroke-width="2"/>
<path d="M5 2.80385C4.08789 3.33046 3.33046 4.08788 2.80385 5" stroke="rgb(209 213 219)" stroke-width="2" stroke-linecap="round"/>
<path d="M19 2.80385C19.9121 3.33046 20.6695 4.08788 21.1962 5" stroke="rgb(209 213 219)" stroke-width="2" stroke-linecap="round"/>
<path d="M9 9H14.6379C14.7715 9 14.8384 9.16157 14.7439 9.25607L9.25607 14.7439C9.16157 14.8384 9.2285 15 9.36213 15H15" stroke="rgb(209 213 219)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
  {
    value: 'Completed',
    image: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00009 13L12.2278 16.3821C12.6557 16.7245 13.2794 16.6586 13.6264 16.2345L22.0001 6" stroke="rgb(209 213 219)" stroke-width="2" stroke-linecap="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.1892 12.2368L15.774 6.63327C16.1237 6.20582 16.0607 5.5758 15.6332 5.22607C15.2058 4.87635 14.5758 4.93935 14.226 5.36679L9.65273 10.9564L11.1892 12.2368ZM8.02292 16.1068L6.48641 14.8263L5.83309 15.6248L2.6 13.2C2.15817 12.8687 1.53137 12.9582 1.2 13.4C0.868627 13.8419 0.95817 14.4687 1.4 14.8L4.63309 17.2248C5.49047 17.8679 6.70234 17.7208 7.381 16.8913L8.02292 16.1068Z" fill="rgb(209 213 219)"/>
</svg>
`,
  },
  {
    value: 'Cancelled',
    image: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="3" stroke="rgb(209 213 219)" stroke-width="2"/>
<path d="M12 8V6M12 3V6M12 6L9 4M12 6L15 4" stroke="rgb(209 213 219)" stroke-width="2" stroke-linecap="round"/>
<path d="M16 12L18 12M21 12L18 12M18 12L20 9M18 12L20 15" stroke="rgb(209 213 219)" stroke-width="2" stroke-linecap="round"/>
<path d="M12 16V18M12 21V18M12 18L9 20M12 18L15 20" stroke="rgb(209 213 219)" stroke-width="2" stroke-linecap="round"/>
<path d="M8 12L6 12M3 12L6 12M6 12L4 9M6 12L4 15" stroke="rgb(209 213 219)" stroke-width="2" stroke-linecap="round"/>
</svg>`,
  },
  {
    value: 'Draft',
    image: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 21L5.81092 17.9747C5.37149 10.9438 10.9554 5 18 5V5L16.7827 5.97387C14.3918 7.88656 13 10.7824 13 13.8442V13.8442C13 15.9831 11.0278 17.5774 8.93642 17.1292L6 16.5" stroke="rgb(209 213 219)" stroke-width="2"/>
</svg>
`,
  },
]

export default projectStatuses
