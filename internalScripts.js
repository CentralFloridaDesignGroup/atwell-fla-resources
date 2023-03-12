/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */
(() => {
  'use strict'

  const storedTheme = localStorage.getItem('theme')

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = function (theme) {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = theme => {
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
    })

    btnToActive.classList.add('active')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (storedTheme !== 'light' || storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          localStorage.setItem('theme', theme)
          setTheme(theme)
          showActiveTheme(theme)
        })
      })
  })
})()


function CopyTextToClipboard(id) {
  var text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);
  const toast = new bootstrap.Toast(document.getElementById('liveToast'))
  toast.show()
}

function setText(source, targetName) {
  document.getElementById(targetName).innerText = source.value
}

function buildBenchmark() {
  const benchmarkName = document.getElementById('benchmarkName').value;
  const description = document.getElementById('description').value;
  const northing = document.getElementById('northing').value;
  const easting = document.getElementById('easting').value;
  const elevation = document.getElementById('elevation').value;

  var strReturn = "";

  if (benchmarkName != "") {
    strReturn = benchmarkName + ", being a ";
  }
  strReturn = strReturn + description + " having a northing of " + northing + ", an easting of " + easting + ", and an elevation of " + elevation + ".";
  document.getElementById('benchmark-value').innerText = strReturn;
}

var noteList = [];

function toggleNote(button, note) {
  if (noteList.includes(note)) {
    noteList.splice(noteList.indexOf(note),1);
    button.classList.remove("btn-success");
    button.classList.add("btn-secondary");
    button.innerText = "Add to List";
    console.debug(noteList);
    if (noteList.length < 1) {
      document.getElementById("generateNoteListBtn").classList.add("disabled");
    }
    return;
  }
  noteList.push(note);
  button.classList.add("btn-success");
  button.classList.remove("btn-secondary");
  document.getElementById("generateNoteListBtn").classList.remove("disabled");
  button.innerText = "Remove from List";
  console.debug(noteList);
  return;
}

function getNoteList() {
  var strReturn = "";

  noteList.sort();
  noteList.forEach((item) => {
    strReturn = strReturn + document.getElementById(item).innerText + "\n\n";
  });

  navigator.clipboard.writeText(strReturn);
  console.log(strReturn);
  const toast = new bootstrap.Toast(document.getElementById('noteListToast'))
  toast.show()
}