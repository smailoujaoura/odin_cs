import { LinkedList } from "./LinkedList.js";

// // GP TESTS
// describe("LinkedList", () => {
//   let list;

//   beforeEach(() => {
// 	list = new LinkedList();
//   });

//   test("appends nodes correctly", () => {
// 	list.append(10);
// 	list.append(20);
// 	expect(list._root.value).toBe(10);
// 	expect(list._tail.value).toBe(20);
// 	expect(list._size).toBe(2);
//   });

//   test("prepends nodes correctly", () => {
// 	list.prepend(10);
// 	list.prepend(20);
// 	expect(list._root.value).toBe(20);
// 	expect(list._tail.value).toBe(10);
// 	expect(list._size).toBe(2);
//   });

//   test("finds nodes at correct indices", () => {
// 	list.append("a");
// 	list.append("b");
// 	list.append("c");
// 	expect(list.at(0).value).toBe("a");
// 	expect(list.at(2).value).toBe("c");
// 	expect(list.at(3)).toBeNull();
//   });

//   test("pop removes last element correctly", () => {
// 	list.append(1);
// 	list.append(2);
// 	list.append(3);
// 	list.pop();
// 	expect(list._tail.value).toBe(2);
// 	expect(list._size).toBe(2);
//   });

//   test("contains() works properly", () => {
// 	list.append("x");
// 	list.append("y");
// 	expect(list.contains("x")).toBe(true);
// 	expect(list.contains("z")).toBe(false);
//   });

//   test("find() returns correct indices", () => {
// 	list.append("x");
// 	list.append("y");
// 	list.append("z");
// 	expect(list.find("y")).toBe(1);
// 	expect(list.find("q")).toBeNull();
//   });

//   test("insertAt() works in all positions", () => {
// 	list.append("a");
// 	list.append("b");
// 	list.insertAt("start", 0); // prepend
// 	list.insertAt("end", 10); // append
// 	list.insertAt("middle", 2);
// 	expect(list.at(0).value).toBe("start");
// 	expect(list.at(2).value).toBe("middle");
// 	expect(list._tail.value).toBe("end");
//   });

//   test("removeAt() works in all positions", () => {
// 	list.append(1);
// 	list.append(2);
// 	list.append(3);
// 	list.removeAt(0); // remove head
// 	expect(list._root.value).toBe(2);
// 	list.removeAt(1); // remove tail
// 	expect(list._tail.value).toBe(2);
// 	expect(list._size).toBe(1);
//   });

//   test("toString() outputs correct format", () => {
// 	list.append(1);
// 	list.append(2);
// 	list.append(3);
// 	expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 3 ) -> null");
//   });

//   test("handles empty list operations gracefully", () => {
// 	expect(() => list.pop()).not.toThrow();
// 	expect(() => list.removeAt(0)).not.toThrow();
// 	expect(list.toString()).toBe("null");
//   });
// });

// Claude tests
describe("LinkedList", () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  test("appends nodes correctly", () => {
    list.append(10);
    list.append(20);
    expect(list._root.value).toBe(10);
    expect(list._tail.value).toBe(20);
    expect(list._size).toBe(2);
  });

  test("prepends nodes correctly", () => {
    list.prepend(10);
    list.prepend(20);
    expect(list._root.value).toBe(20);
    expect(list._tail.value).toBe(10);
    expect(list._size).toBe(2);
  });

  test("finds nodes at correct indices", () => {
    list.append("a");
    list.append("b");
    list.append("c");
    expect(list.at(0).value).toBe("a");
    expect(list.at(2).value).toBe("c");
    expect(list.at(3)).toBeNull();
  });

  test("pop removes last element correctly", () => {
    list.append(1);
    list.append(2);
    list.append(3);
    list.pop();
    expect(list._tail.value).toBe(2);
    expect(list._size).toBe(2);
  });

  test("contains() works properly", () => {
    list.append("x");
    list.append("y");
    expect(list.contains("x")).toBe(true);
    expect(list.contains("z")).toBe(false);
  });

  test("find() returns correct indices", () => {
    list.append("x");
    list.append("y");
    list.append("z");
    expect(list.find("y")).toBe(1);
    expect(list.find("q")).toBeNull();
  });

  test("insertAt() works in all positions", () => {
    list.append("a");
    list.append("b");
    list.insertAt("start", 0);
    list.insertAt("end", 10);
    list.insertAt("middle", 2);
    expect(list.at(0).value).toBe("start");
    expect(list.at(2).value).toBe("middle");
    expect(list._tail.value).toBe("end");
  });

  test("removeAt() works in all positions", () => {
    list.append(1);
    list.append(2);
    list.append(3);
    list.removeAt(0);
    expect(list._root.value).toBe(2);
    list.removeAt(1);
    expect(list._tail.value).toBe(2);
    expect(list._size).toBe(1);
  });

  test("toString() outputs correct format", () => {
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.toString()).toBe("( 1 ) -> ( 2 ) -> ( 3 ) -> null");
  });

  test("handles empty list operations gracefully", () => {
    expect(() => list.pop()).not.toThrow();
    expect(() => list.removeAt(0)).not.toThrow();
    expect(list.toString()).toBe("null");
  });

  // ===== PROFESSIONAL KILLER TESTS =====

  describe("size() method", () => {
    test("CRITICAL: size() should not cause stack overflow", () => {
      list.append(1);
      list.append(2);
      // This will infinite recurse if size() returns this._size
      expect(() => list.size()).not.toThrow();
      expect(list.size()).toBe(2);
    });

    test("size property should still work", () => {
      list.append(1);
      expect(list._size).toBe(1);
    });
  });

  describe("insertAt() size consistency", () => {
    test("insertAt(val, 0) should not double-increment size", () => {
      list.append(1);
      list.append(2);
      list.insertAt(99, 0);
      expect(list._size).toBe(3); // Not 4!
    });

    test("insertAt(val, largeIndex) should not double-increment size", () => {
      list.append(1);
      list.insertAt(99, 1000);
      expect(list._size).toBe(2); // Not 3!
    });

    test("multiple insertAt at boundaries maintains correct size", () => {
      list.insertAt(1, 0);
      expect(list._size).toBe(1);
      list.insertAt(2, 0);
      expect(list._size).toBe(2);
      list.insertAt(3, 999);
      expect(list._size).toBe(3);
      list.insertAt(4, 999);
      expect(list._size).toBe(4);
    });
  });

  describe("removeAt() critical bugs", () => {
    test("CRITICAL: removeAt() should decrement size for all positions", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      list.removeAt(1); // Middle
      expect(list._size).toBe(2); // Will fail - size never decrements!
    });

    test("removeAt(0) should decrement size", () => {
      list.append(1);
      list.append(2);
      list.removeAt(0);
      expect(list._size).toBe(1);
    });

    test("removeAt() should handle negative indices gracefully", () => {
      list.append(1);
      list.append(2);
      expect(() => list.removeAt(-1)).not.toThrow();
      expect(list._size).toBe(2); // Should not change
    });

    test("removeAt() should handle out-of-bounds indices", () => {
      list.append(1);
      expect(() => list.removeAt(10)).not.toThrow();
      expect(list._size).toBe(1); // Should not change
    });

    test("removeAt(0) on single element should clear tail", () => {
      list.append(1);
      list.removeAt(0);
      expect(list._root).toBeNull();
      expect(list._tail).toBeNull();
      expect(list._size).toBe(0);
    });

    test("removeAt() on empty list should not crash", () => {
      expect(() => list.removeAt(0)).not.toThrow();
      expect(list._size).toBe(0);
    });
  });

  describe("Stress tests", () => {
    test("100 appends and size checks", () => {
      for (let i = 0; i < 100; i++) {
        list.append(i);
      }
      expect(list._size).toBe(100);
      expect(() => list.size()).not.toThrow(); // Check method doesn't recurse
    });

    test("complex operation sequence maintains integrity", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list._size).toBe(3);

      list.removeAt(1);
      expect(list._size).toBe(2);
      expect(list.at(1).value).toBe(3);

      list.insertAt(99, 1);
      expect(list._size).toBe(3);
      expect(list.at(1).value).toBe(99);

      list.pop();
      expect(list._size).toBe(2);

      list.prepend(0);
      expect(list._size).toBe(3);
    });

    test("alternating inserts and removes", () => {
      for (let i = 0; i < 10; i++) {
        list.append(i);
      }
      expect(list._size).toBe(10);

      for (let i = 0; i < 5; i++) {
        list.removeAt(0);
      }
      expect(list._size).toBe(5);

      for (let i = 0; i < 5; i++) {
        list.insertAt(i, 0);
      }
      expect(list._size).toBe(10);
    });
  });

  describe("Edge cases", () => {
    test("tail() method returns correct node", () => {
      list.append(1);
      list.append(2);
      expect(list.tail().value).toBe(2);
    });

    test("head() method returns correct node", () => {
      list.append(1);
      list.append(2);
      expect(list.head().value).toBe(1);
    });

    test("at() with size boundary", () => {
      list.append(1);
      list.append(2);
      expect(list.at(1).value).toBe(2);
      expect(list.at(2)).toBeNull();
    });

    test("pop on single element clears everything", () => {
      list.append(1);
      list.pop();
      expect(list._root).toBeNull();
      expect(list._tail).toBeNull();
      expect(list._size).toBe(0);
    });

    test("multiple pops handle gracefully", () => {
      list.append(1);
      list.pop();
      list.pop(); // Should not crash
      list.pop(); // Should not crash
      expect(list._size).toBe(0);
    });

    test("insertAt middle position is correct", () => {
      list.append("a");
      list.append("b");
      list.append("d");
      list.insertAt("c", 2);
      expect(list.at(2).value).toBe("c");
      expect(list.at(3).value).toBe("d");
      expect(list._size).toBe(4);
    });
  });

  describe("Data integrity", () => {
    test("list maintains proper links after operations", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      list.removeAt(1);

      // Verify chain is intact
      expect(list._root.value).toBe(1);
      expect(list._root.nextNode.value).toBe(3);
      expect(list._root.nextNode.nextNode).toBeNull();
    });

    test("tail always points to last node", () => {
      list.append(1);
      expect(list._tail.value).toBe(1);

      list.append(2);
      expect(list._tail.value).toBe(2);

      list.pop();
      expect(list._tail.value).toBe(1);

      list.append(3);
      expect(list._tail.value).toBe(3);
    });
  });
});