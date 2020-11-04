import DB from "helpers/db";
import store from "store";
import Controller_Profile from "fetchers/Profile";
import Controller_Academy from "fetchers/Academy";

const db = new DB();

export const loadUserData = (_callback) => {
  let userData = store.getState().userData;

  if (!userData) {
    if (db.get("api-token")) {
      const profile = new Controller_Profile();
      profile.getUserData(() => {
        _callback();
      });
    }
  }
};

/* =========================================================
 *
 * ========================================================= */

export const loadItems = (_callback) => {
  let courseInUrl = document.baseURI.split("/")[3];
  let items = store.getState().academy.items;

  if (!items[courseInUrl]) {
    const academy = new Controller_Academy();
    academy.loadItems(courseInUrl, (response, error) => {
      if (response.items) {
        if (response.items.length !== 0) _callback(null, response.items);
      } else {
        _callback(error, null);
      }
    });
  } else {
    _callback(null, items[courseInUrl]);
  }
};

/* =========================================================
 *
 * ========================================================= */

export const getCurrentCourse = (courses) => {
  let courseInUrl = document.baseURI.split("/")[3];

  if (courses) {
    return courses.find((course) => {
      return course.course_short_link === courseInUrl;
    });
  } else {
    return null;
  }
};

/* =========================================================
 *
 * ========================================================= */

const sortItems = (array) => {
  var aux = array;

  for (let y = 0; y <= array.length - 2; y++) {
    for (let i = 0; i <= array.length - 2; i++) {
      if (array[i].item_sort > array[i + 1].item_sort) {
        aux = array[i];
        array[i] = array[i + 1];
        array[i + 1] = aux;
      }
    }
  }
  return array;
};

/* =========================================================
 *
 * ========================================================= */

const getCurrentTitle = (items) => {
  let courseInUrl = document.baseURI.split("/")[3];
  let item_title = document.baseURI.split("/")[4];

  let _items = sortItems(items).filter(
    (item) => item.item_type !== "separator"
  );

  let targetItem = null;

  if (item_title) {
    targetItem = getShortLink(item_title);
    db.set("lastItem>" + courseInUrl, targetItem);
  } else {
    let indb = db.get("lastItem>" + courseInUrl);
    if (indb === undefined) {
      targetItem = getShortLink(_items[0].item_title);
      db.set("lastItem>" + courseInUrl, targetItem);
    } else {
      targetItem = indb;
    }
  }

  let aux = _items.find((item) => {
    return getShortLink(item.item_title) === targetItem;
  });

  if (!aux) {
    db.set("lastItem>" + courseInUrl, getShortLink(_items[0].item_title));
    return getShortLink(_items[0].item_title);
  } else {
    return targetItem;
  }
};

/* =========================================================
 *
 * ========================================================= */

export const getCurrentItem = (items) => {
  if (items && items.length !== 0) {
    let nextItem = null;
    let currentItem = null;
    let proviusItem = null;
    let itemIndex = 0;

    let currentTitle = getCurrentTitle(items);

    const _items = sortItems(items).filter(
      (item) => item.item_type !== "separator"
    );

    const title = getShortLink(currentTitle);
    _items.forEach((item, key) => {
      if (getShortLink(item.item_title) === title) {
        proviusItem = _items[key - 1];
        currentItem = item;
        nextItem = _items[key + 1];
        itemIndex = key + 1;
      }
    });

    return { proviusItem, currentItem, nextItem, itemIndex };
  } else {
    return {};
  }
};

/* =========================================================
 *
 * ========================================================= */

export const getShortLink = (link) => {
  let newString = link;
  newString = newString.toLowerCase();
  newString = newString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  newString = newString.replace(/ /g, "_");
  newString = newString.replace(/\?/g, "");
  newString = newString.replace(/¿/g, "");
  return newString;
};
