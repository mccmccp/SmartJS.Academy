/*
 * �������� ������� all ����������� �� ���� ������ ��� ������ Promise � ���������� ��������� ����������
 * Promise.all - ������� all ���������� ������, ������� ����� ������� �����������, ���� ��� �������
 * ������� ���������, � ������������� ���� ���� �� ���� ����������.
 *
 *
 * ������:
 // � ���� ������� � �����������, ��� � ���� ���� ��������� �������
 // p1 - ������� ���������� ������ 'Promise1',
 // p2 - ������� ���������� ������ 'Promise2',
 // e1 - ������� ������������� � ������� 'Error1'

 all([p1, p2]).then(r => console.log(r)) // ������� ['Promise1', 'Promise2']
 all({ foo: p2, bar: p1 }).then(r => console.log(r)) // ������� { foo: 'Promise2', bar: 'Promise1' }
 all([p1, e1]).catch(r => console.log(r)) // ������� 'Error1'
 *
 *
 * */


window.onload = function(){

    function all(promiseArray){
        //��������� ������� � �������� ��� �� ���� ���� � �� �� �������
        //�� ������ ������, ����������� �������

        const promise = new Promise(function(resolve, reject){
            let counter = 0;
            const arr = [];
            const obj = {};

            if(promiseArray instanceof Array){
                for(let i=0; i < promiseArray.length; i++){
                    promiseArray[i].then(function(arg){
                        counter++;
                        arr[i] = arg;
                        if(counter === promiseArray.length){
                            resolve(arr);
                        }
                    }, function(arg){
                            reject (arg);
                        }
                    );
                }
            }
            else if(promiseArray instanceof Object){
                for(let key in promiseArray){
                    obj[key] = null;
                    console.log(key);

                    promiseArray[key].then(function(){
                        counter++;
                        promiseArray[key].then(function(arg){
                            obj[key] = arg;
                        });
                        if(counter == Object.keys(promiseArray).length){
                            resolve(obj);
                        }
                    })
                }
            }
        });

        return promise;

    }

    const p1 = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("Promise1");
        }, 0);

    });

    const p2 = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("Promise2");
        }, 0);
    });

    const p3 = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("Promise3");
        }, 0);
    });

    const e1 = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject("Error1");
        }, 0);
    })
    all([p1, p2]).then(r => console.log(r)) // ������� ['Promise1', 'Promise2']
    //all({ foo: p2, bar: p1}).then(r => console.log(r)) // ������� { foo: 'Promise2', bar: 'Promise1' }
    //all([p1, e1]).catch(r => console.log(r)) // ������� 'Error1'

}






